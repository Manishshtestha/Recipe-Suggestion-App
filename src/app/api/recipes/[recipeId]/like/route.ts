import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/_lib/mongoose";
import RecipeModel from "@/app/_lib/models/recipeModel";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(
	request: NextRequest,
	{ params }: { params: { recipeId: string } }
) {
	try {
		await dbConnect();

		const session = await getServerSession(authOptions);
		if (!session || !session.user || !session.user.id) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const userId = session.user.id;
		const { recipeId } = await params;

		const recipe = await RecipeModel.findById(recipeId);
		if (!recipe) {
			return NextResponse.json(
				{ error: "Recipe not found" },
				{ status: 404 }
			);
		}

		const userObjectId = recipe.likes.find(
			(id: any) => id.toString() === userId
		);

		if (userObjectId) {
			// User already liked, so remove like (unlike)
			recipe.likes = recipe.likes.filter(
				(id: any) => id.toString() !== userId
			);
		} else {
			// Add like
			recipe.likes.push(Object(userId));
		}

		await recipe.save();

		return NextResponse.json({
			// liked: !hasLiked,
			totalLikes: recipe.likes.length,
		});
	} catch (error) {
		console.error("Error in like/unlike recipe:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
