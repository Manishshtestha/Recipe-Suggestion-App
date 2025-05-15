// src/components/CommentSection.tsx (New File)
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/app/_context/AuthContext"; // Your Auth context
import { IComment } from '@/app/_lib/models/commentModel'; // Import type if needed outside context
import CommentDisplay from "./CommentDisplay"; // Sub-component to display a single comment
import CommentForm from "./CommentForm"; // Sub-component for the comment input form

interface CommentSectionProps {
	recipeId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ recipeId }) => {
	const { user, isLoadingAuth } = useAuth();
	const [comments, setComments] = useState<any[]>([]); // Use a proper type like IComment[]
	console.log(user);
	const [isLoadingComments, setIsLoadingComments] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchComments = useCallback(async () => {
		setIsLoadingComments(true);
		setError(null);
		try {
			// Add query params for pagination later ?page=1&limit=10
			const response = await fetch(`/api/recipes/${recipeId}/comments`);
			if (!response.ok) {
				throw new Error("Failed to fetch comments");
			}
			const data = await response.json();
			setComments(data.comments || []);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setIsLoadingComments(false);
		}
	}, [recipeId]);

	useEffect(() => {
		if (recipeId) {
			fetchComments();
		}
	}, [recipeId, fetchComments]);

	const handleCommentAdded = (newComment: any) => {
		if (newComment.parentComment) {
			fetchComments();
		} else {
			setComments((prev) => [newComment, ...prev]);
		}
		// Or simply refetch all: fetchComments();
	};

	const handleCommentDeleted = (commentId: string) => {
		// Optimistically remove or mark as deleted, or refetch
		// setComments((prev) => prev.filter((c) => c._id !== commentId)); // Simple removal
		// Or mark as deleted:
		setComments(prev => prev.map(c => c._id === commentId ? {...c, isDeleted: true, content: '[deleted]'} : c));
		// Or refetch: fetchComments();
	};


	// Render Logic
	return (
		<div className="mt-10 border-t-2 border-neutral-700 pt-6 font-mono">
			<h2 className="text-2xl font-semibold mb-4 text-pink-400 uppercase tracking-wider">
				// Discussion_Feed
			</h2>

			{isLoadingAuth ? (
				<p className="text-neutral-500">Checking authentication...</p>
			) : user ? (
				<CommentForm
					recipeId={recipeId}
					onCommentAdded={handleCommentAdded}
				/>
			) : (
				<p className="text-neutral-400 bg-neutral-800 border border-neutral-700 p-3 rounded-none text-sm">
					Please{" "}
					<a href="/login" className="text-cyan-400 hover:underline">
						login
					</a>{" "}
					to post a comment.
				</p>
			)}

			{isLoadingComments && (
				<p className="text-neutral-500 mt-4">Loading comments...</p>
			)}
			{error && <p className="text-red-400 mt-4">Error: {error}</p>}

			<div className="mt-6 space-y-4">
				{!isLoadingComments && comments.length === 0 && (
					<p className="text-neutral-500">
						No comments yet. Be the first!
					</p>
				)}
				{!isLoadingComments &&
					comments.map(
						(comment) =>
							// Render only top-level comments here if using parentComment ref
							!comment.parentComment &&
							!comment.isDeleted && (
                                
								<CommentDisplay
									key={comment._id}
									comment={comment}
									recipeId={recipeId}
									currentUserId={user?.id}
									onReplyAdded={handleCommentAdded} // Might need specific logic
									onCommentDeleted={handleCommentDeleted}
									// Pass functions to handle like/report from CommentDisplay
								/>
							)
					)}
			</div>
		</div>
	);
};

export default CommentSection;
