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

	// Find similar recipes by shared ingredients and same cooking method (excluding itself)
	const similarRecipes = await RecipeModel.aggregate([
		{ $match: { _id: { $ne: currentRecipe._id } } },
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
						0
					]
				}
			},
		},
		// Sort by sameCookingMethod first, then sharedIngredients
		{ $sort: { sameCookingMethod: -1, sharedIngredients: -1 } },
		{ $limit: 5 },
	]);

	return NextResponse.json(similarRecipes, { status: 200 });
}
