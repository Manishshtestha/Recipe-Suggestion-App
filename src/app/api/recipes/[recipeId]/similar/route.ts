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

	const pipeline: any = [
		{ $match: { _id: { $ne: currentRecipe._id } } },
	];

	if (currentRecipe.dietaryRestrictions && currentRecipe.dietaryRestrictions.length > 0) {
		pipeline.push({
			$match: {
				dietaryRestrictions: { $all: currentRecipe.dietaryRestrictions },
			},
		});
	}

	// Find similar recipes by shared ingredients (at least 50% match) and same cooking method (excluding itself)
	const similarRecipes = await RecipeModel.aggregate([
		...pipeline,
		{
			$addFields: {
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
		{
			$match: {
				$expr: {
					$gte: [
						{
							$cond: {
								if: { $eq: [{ $size: "$ingredients" }, 0] },
								then: 0,
								else: {
									$divide: [
										"$sharedIngredients",
										{ $size: "$ingredients" },
									],
								},
							},
						},
						0.5,
					],
				},
			},
		},
		// Sort by sameCookingMethod first, then sharedIngredients
		{ $sort: { sameCookingMethod: -1, sharedIngredients: -1 } },
		{ $limit: 5 },
	]);

	return NextResponse.json(similarRecipes, { status: 200 });
}
