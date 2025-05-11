// e:\Sem 6\Project\kitchen_genie\src\app\api\users\route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/_lib/mongoose";
import UserModel from "@/app/_lib/models/userModel";
import bcrypt from "bcryptjs"; // Make sure to install bcryptjs: npm install bcryptjs @types/bcryptjs
import { z } from "zod"; // Or import RegistrationSchema from shared file

// Define schema here or import it (as shown in Step 1)
const RegistrationSchema = z.object({
	name: z.string().min(1, { message: "Name is required." }),
	email: z.string().email({ message: "Invalid email address." }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long." }),
});

export async function POST(req: NextRequest) {
	try {
		await dbConnect();

		const body = await req.json();

		// Validate the request body using Zod
		const validationResult = RegistrationSchema.safeParse(body);

		if (!validationResult.success) {
			// Collect all error messages
			const errorMessages = validationResult.error.errors.map((err) => ({
				field: err.path.join("."), // e.g., "email" or "password"
				message: err.message,
			}));
			return NextResponse.json(
				{ message: "Validation failed", errors: errorMessages },
				{ status: 400 } // Bad Request
			);
		}

		// If validation succeeds, validationResult.data contains the typed data
		const { name, email, password } = validationResult.data;

		// Check if user already exists
		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			return NextResponse.json(
				{ message: "User with this email already exists." },
				{ status: 409 } // Conflict
			);
		}

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create new user
		const newUser = new UserModel({
			name,
			email,
			password: hashedPassword,
			// Initialize followers/following if needed
			followers: [],
			following: [],
		});

		await newUser.save();

		return NextResponse.json(
			{ message: "User registered successfully", userId: newUser._id },
			{ status: 201 } // Created
		);
	} catch (error: any) {
		console.error("Registration Error:", error);
		// Distinguish between ZodError and other errors if needed, though safeParse handles Zod errors above.
		if (error instanceof z.ZodError) {
			// Should be caught by safeParse, but as a fallback
			return NextResponse.json(
				{ message: "Validation error", errors: error.errors },
				{ status: 400 }
			);
		}
		return NextResponse.json(
			{
				message: "An internal server error occurred.",
				error: error.message,
			},
			{ status: 500 }
		);
	}
}
