// e:\Sem 6\Project\kitchen_genie\src\app\api\auth\login\route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/_lib/mongoose';
import UserModel from '@/app/_lib/models/userModel';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Define Zod schema for login
const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(1, { message: "Password is required." }), // Basic check, length check can be more specific if desired
});

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const body = await req.json();

        // Validate the request body using Zod
        const validationResult = LoginSchema.safeParse(body);

        if (!validationResult.success) {
            const errorMessages = validationResult.error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
            }));
            return NextResponse.json(
                { message: "Validation failed", errors: errorMessages },
                { status: 400 } // Bad Request
            );
        }

        const { email, password } = validationResult.data;

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials. User not found." }, // Keep error messages somewhat generic for security
                { status: 401 } // Unauthorized
            );
        }

        // Compare provided password with stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json(
                { message: "Invalid credentials. Password mismatch." }, // Keep error messages somewhat generic
                { status: 401 } // Unauthorized
            );
        }

        // At this point, login is successful
        // In a real app, you would generate a session token (e.g., JWT) here
        // and return it, or set a cookie.

        // For now, just return a success message and user info (excluding password)
        const { password: _, ...userWithoutPassword } = user.toObject(); // Exclude password from response

        return NextResponse.json(
            { 
                message: "Login successful", 
                user: userWithoutPassword 
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Login Error:", error);
        if (error instanceof z.ZodError) { // Should be caught by safeParse, but as a fallback
             return NextResponse.json(
                { message: "Validation error during login", errors: error.errors },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: "An internal server error occurred during login.", error: error.message },
            { status: 500 }
        );
    }
}
