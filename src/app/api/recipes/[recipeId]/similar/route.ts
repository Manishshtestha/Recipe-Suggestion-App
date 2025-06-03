import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/_lib/mongoose";
import RecipeModel from "@/app/_lib/models/recipeModel";

export async function GET() {
	await dbConnect();
	try {
		const recipes = await RecipeModel.find({});
		return NextResponse.json(recipes, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch recipes" },
			{ status: 500 }
		);
	}
}
