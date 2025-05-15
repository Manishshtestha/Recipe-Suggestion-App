import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/_lib/mongoose";
import CommentModel from "@/app/_lib/models/commentModel";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: NextRequest, { params }: { params: { commentId: string } }) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { commentId } = params;

    const comment = await CommentModel.findById(commentId);
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    const userObjectId = comment.likes.find((id: any) => id.toString() === userId);

    if (userObjectId) {
      // User already liked, so remove like (unlike)
      comment.likes = comment.likes.filter((id: any) => id.toString() !== userId);
    } else {
      // Add like
      comment.likes.push(userId);
    }

    await comment.save();

    return NextResponse.json({ 
      message: userObjectId ? "Like removed" : "Like added",
      likesCount: comment.likes.length,
    });
  } catch (error) {
    console.error("Error in like/unlike comment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
