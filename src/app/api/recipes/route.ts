import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/_lib/mongoose";
import RecipeModel from "@/app/_lib/models/recipeModel";

export async function GET() {
  await dbConnect();
  try {
    const recipes = await RecipeModel.find({});
    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const recipeData = await request.json();
    
    // Log the incoming data for debugging
    console.log("=== RECIPE INSERTION DEBUG ===");
    console.log("Received recipe data:", JSON.stringify(recipeData, null, 2));
    console.log("Nutrition type:", typeof recipeData.nutrition);
    console.log("Nutrition is array:", Array.isArray(recipeData.nutrition));
    if (recipeData.nutrition) {
      console.log("Nutrition length:", recipeData.nutrition.length);
      console.log("First nutrition item:", recipeData.nutrition[0]);
      console.log("First nutrition item type:", typeof recipeData.nutrition[0]);
      console.log("Raw nutrition value:", recipeData.nutrition);
    }
    console.log("=== END DEBUG ===");

    // If nutrition is a string, try to parse it
    if (typeof recipeData.nutrition === 'string') {
      try {
        console.log("Attempting to parse nutrition string...");
        recipeData.nutrition = JSON.parse(recipeData.nutrition);
        console.log("Parsed nutrition:", recipeData.nutrition);
      } catch (parseError) {
        console.error("Failed to parse nutrition string:", parseError);
        return NextResponse.json({ 
          error: "Invalid nutrition data format",
          details: "Nutrition data is malformed"
        }, { status: 400 });
      }
    }

    const newRecipe = new RecipeModel(recipeData);
    
    // Validate the recipe before saving
    const validationError = newRecipe.validateSync();
    if (validationError) {
      console.error("Validation error:", validationError);
      return NextResponse.json({ 
        error: "Validation failed", 
        details: validationError.message 
      }, { status: 400 });
    }

    await newRecipe.save();

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error("Error inserting recipe:", error);
    return NextResponse.json({ 
      error: "Failed to insert recipe",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
