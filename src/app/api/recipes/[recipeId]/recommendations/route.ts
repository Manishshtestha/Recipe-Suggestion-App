import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/_lib/mongoose";
import RecipeModel from "@/app/_lib/models/recipeModel";
import mongoose from "mongoose";

export async function GET(
	request: NextRequest,
	{ params }: { params: { recipeId: string } }
) {
	await dbConnect();
	const { recipeId } = params;

	try {
		const currentRecipe = await RecipeModel.findById(recipeId).lean();
		if (!currentRecipe) {
			return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
		}

		// 1. Find users who liked the current recipe
		const usersWhoLiked = currentRecipe.likes;
		if (usersWhoLiked.length === 0) {
			return NextResponse.json([], { status: 200 }); // No users, no recommendations
		}

		// 2. Find other recipes liked by these users
		const recommendations = await RecipeModel.aggregate([
			// Find recipes liked by the "similar users", excluding the current recipe
			{
				$match: {
					_id: {
						$ne: new mongoose.Types.ObjectId(recipeId),
					},
					likes: { $in: usersWhoLiked },
				},
			},
			// Add a field for the number of "similar users" who liked each recipe
			{
				$addFields: {
					recommendationScore: {
						$size: {
							$setIntersection: ["$likes", usersWhoLiked],
						},
					},
				},
			},
			// Sort by the recommendation score
			{
				$sort: {
					recommendationScore: -1,
				},
			},
			// Limit to the top 5 recommendations
			{
				$limit: 5,
			},
		]);

		return NextResponse.json(recommendations, { status: 200 });
	} catch (error) {
		console.error("Failed to fetch recommendations:", error);
		return NextResponse.json(
			{ error: "Failed to fetch recommendations" },
			{ status: 500 }
		);
	}
} 