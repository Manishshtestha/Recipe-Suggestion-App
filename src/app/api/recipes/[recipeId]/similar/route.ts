import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/_lib/mongoose";
import RecipeModel from "@/app/_lib/models/recipeModel";

export async function GET(
	request: NextRequest,
	{ params }: { params: { recipeId: string } }
) {
	await dbConnect();
	const { recipeId } = params;

	// Get the current recipe
	const currentRecipe = await RecipeModel.findById(recipeId).lean();
	if (!currentRecipe) {
		return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
	}

	// Create a regex from important words in the recipe name to find similar titles
	const nameKeywords = currentRecipe.name
		.split(" ")
		.filter((word) => word.length > 3) // Filter out short/common words
		.join("|");

	const aggregationPipeline: any[] = [
		// Exclude the current recipe
		{ $match: { _id: { $ne: currentRecipe._id } } },
	];

	// Filter by dietary restrictions if they exist
	if (
		currentRecipe.dietaryRestrictions &&
		currentRecipe.dietaryRestrictions.length > 0
	) {
		aggregationPipeline.push({
			$match: {
				dietaryRestrictions: { $all: currentRecipe.dietaryRestrictions },
			},
		});
	}

	// Add fields for scoring and sorting
	aggregationPipeline.push(
		{
			$addFields: {
				nameScore:
					nameKeywords
						? {
								$cond: {
									if: {
										$regexMatch: {
											input: "$name",
											regex: nameKeywords,
											options: "i",
										},
									},
									then: 1,
									else: 0,
								},
						  }
						: 0,
				sharedIngredients: {
					$size: {
						$setIntersection: ["$ingredients", currentRecipe.ingredients],
					},
				},
				sameCookingMethod: {
					$cond: [
						{ $eq: ["$cookingMethod", currentRecipe.cookingMethod] },
						1,
						0,
					],
				},
			},
		},
		// Sort by name similarity, then shared ingredients, then cooking method
		{
			$sort: {
				nameScore: -1,
				sharedIngredients: -1,
				sameCookingMethod: -1,
			},
		},
		{ $limit: 5 }
	);

	const similarRecipes = await RecipeModel.aggregate(aggregationPipeline);

	return NextResponse.json(similarRecipes, { status: 200 });
}
