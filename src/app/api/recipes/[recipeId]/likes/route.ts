import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import RecipeModel from '@/app/_lib/models/recipeModel';
import dbConnect from "@/app/_lib/mongoose";


export async function POST(req: any, { params }: any) {
  try {
    await dbConnect();

    const { recipeId } = params;
    const userId = req.headers.get('userId');

    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const recipe = await RecipeModel.findById(recipeId);

    if (!recipe) {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
    }

    if (recipe.likes.includes(userId)) {
      return NextResponse.json({ message: 'Recipe already liked by this user' }, { status: 400 });
    }

    recipe.likes.push(userId);
    await recipe.save();

    return NextResponse.json({ message: 'Recipe liked successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error liking recipe:', error);
    return NextResponse.json({ message: 'Error liking recipe' }, { status: 500 });
  }
}

export async function DELETE(req: any, { params }: any) {
  try {
    await dbConnect();

    const { recipeId } = params;
    const userId = req.headers.get('userId');

    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const recipe = await RecipeModel.findById(recipeId);

    if (!recipe) {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
    }

    if (!recipe.likes.includes(userId)) {
      return NextResponse.json({ message: 'Recipe not liked by this user' }, { status: 400 });
    }

    recipe.likes = recipe.likes.filter((id: any) => id.toString() !== userId);
    await recipe.save();

    return NextResponse.json({ message: 'Recipe unliked successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error unliking recipe:', error);
    return NextResponse.json({ message: 'Error unliking recipe' }, { status: 500 });
  }
}
