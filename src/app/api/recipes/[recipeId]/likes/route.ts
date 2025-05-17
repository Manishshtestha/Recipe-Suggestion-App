import { NextResponse } from "next/server";
import dbConnect from "@/app/_lib/mongoose";
import RecipeModel from "@/app/_lib/models/recipeModel";
import { getServerSession } from "next-auth"; // Assuming NextAuth.js for authentication
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Types } from "mongoose";

export async function POST(
	request: Request,
	{ params }: { params: { recipeId: string } }
) {
	try {
		await dbConnect();
		const { recipeId } = params;

		// Get the user session (requires authentication)
		const session = await getServerSession(authOptions);
		if (!session || !session.user?.id) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}
		const userId = session.user.id;

		// Find the recipe
		const recipe = await RecipeModel.findById(recipeId);
		if (!recipe) {
			return NextResponse.json(
				{ error: "Recipe not found" },
				{ status: 404 }
			);
		}

		// Check if user already liked the recipe
		const hasLiked = recipe.likes.some(
			(id: Types.ObjectId) => id.toString() === userId
		);

		if (hasLiked) {
			// Unlike: Remove user ID from likes array
			recipe.likes = recipe.likes.filter(
				(id: Types.ObjectId) => id.toString() !== userId
			);
		} else {
			// Like: Add user ID to likes array
			recipe.likes.push(new Types.ObjectId(userId));
		}

		await recipe.save();

		return NextResponse.json({
			liked: !hasLiked,
			totalLikes: recipe.likes.length,
		});
	} catch (error) {
		console.error("Error updating like:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
