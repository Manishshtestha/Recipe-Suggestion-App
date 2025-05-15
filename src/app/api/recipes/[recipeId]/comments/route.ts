// src/app/api/recipes/[recipeId]/comments/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/_lib/mongoose";
import CommentModel from "@/app/_lib/models/commentModel";
import RecipeModel from "@/app/_lib/models/recipeModel";
import { z } from "zod";
import { useSession } from "next-auth/react";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const CreateCommentSchema = z.object({
	content: z
		.string()
		.min(1, "Comment content cannot be empty.")
		.max(1000, "Comment cannot exceed 1000 characters."),
	parentCommentId: z.string().optional().nullable(),
	userId: z.string()
});

export async function POST(
	req: NextRequest,
	{ params }: { params: { recipeId: string } }
) {
	try {
		await dbConnect();

		const { recipeId } = params;
		if (!recipeId || !mongoose.Types.ObjectId.isValid(recipeId)) {
			return NextResponse.json(
				{ message: "Invalid Recipe ID format." },
				{ status: 400 }
			);
		}

		const body = await req.json();
		const validationResult = CreateCommentSchema.safeParse(body);

		if (!validationResult.success) {
			return NextResponse.json(
				{
					message: "Validation failed",
					errors: validationResult.error.errors,
				},
				{ status: 400 }
			);
		}

		const { content, parentCommentId, userId } = validationResult.data;

		if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
			return NextResponse.json(
				{ message: "Invalid User ID." },
				{ status: 400 }
			);
		}

		const recipeExists = await RecipeModel.findById(recipeId);
		if (!recipeExists) {
			return NextResponse.json(
				{ message: "Recipe not found." },
				{ status: 404 }
			);
		}

		if (
			parentCommentId &&
			!mongoose.Types.ObjectId.isValid(parentCommentId)
		) {
			return NextResponse.json(
				{ message: "Invalid Parent Comment ID format." },
				{ status: 400 }
			);
		}

		if (parentCommentId) {
			const parent = await CommentModel.findById(parentCommentId);
			if (!parent || parent.recipe.toString() !== recipeId) {
				return NextResponse.json(
					{
						message:
							"Parent comment not found or does not belong to this recipe.",
					},
					{ status: 404 }
				);
			}
		}

		const newComment = new CommentModel({
			content,
			user: userId,
			recipe: recipeId,
			parentComment: parentCommentId || null,
		});

		await newComment.save();

		const populatedComment = await CommentModel.findById(newComment._id)
			.populate("user", "name _id email")
			.exec();

		return NextResponse.json(
			{
				message: "Comment posted successfully!",
				comment: populatedComment,
			},
			{ status: 201 }
		);
	} catch (error: any) {
		console.error("Failed to post comment:", error);
		return NextResponse.json(
			{
				message: "An internal server error occurred.",
				error: error.message,
			},
			{ status: 500 }
		);
	}
}

// GET Handler to fetch comments for a recipe
export async function GET(
	req: NextRequest,
	{ params }: { params: { recipeId: string } }
) {
	try {
		await dbConnect();
		const { recipeId } =await params;

		if (!recipeId || !mongoose.Types.ObjectId.isValid(recipeId)) {
			return NextResponse.json(
				{ message: "Invalid Recipe ID format." },
				{ status: 400 }
			);
		}
		const comments = await CommentModel.find({
			recipe: recipeId,
			parentComment: null,
			isDeleted: false,
		})
			.populate("user", "name _id email")
			.sort({ createdAt: -1 });

		return NextResponse.json({ comments }, { status: 200 });
	} catch (error: any) {
		console.error("Failed to fetch comments:", error);
		return NextResponse.json(
			{ message: "Failed to fetch comments.", error: error.message },
			{ status: 500 }
		);
	}
}
