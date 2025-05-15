"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";

interface CommentFormProps {
	recipeId: string;
	parentCommentId?: string | null;
	onCommentAdded: (newComment: any) => void;
	onCancelReply?: () => void;
	inputPlaceholder?: string;
	submitButtonText?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
	recipeId,
	parentCommentId = null,
	onCommentAdded,
	onCancelReply,
	inputPlaceholder = "Add a public comment...",
	submitButtonText = "Comment",
}) => {
	const { data: session } = useSession();
	const [content, setContent] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!content.trim()) return;
		if (!session?.user) {
			setError("You must be logged in to comment");
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(`/api/recipes/${recipeId}/comments`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					content: content.trim(),
					parentCommentId,
					userId: session.user.id, // Send the user ID from the session
				}),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.message || "Failed to post comment.");
			}

			onCommentAdded(result.comment);
			setContent("");
			if (parentCommentId && onCancelReply) {
				onCancelReply();
			}
		} catch (err: any) {
			setError(err.message || "An error occurred.");
		} finally {
			setIsLoading(false);
		}
	};

	if (!session?.user) {
		return null; // Or render a "login to comment" message
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={`mt-3 mb-4 ${
				parentCommentId ? "ml-8 pl-4 border-l-2 border-neutral-700" : ""
			}`}>
			<div className="flex items-start space-x-3">
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder={inputPlaceholder}
					rows={parentCommentId ? 2 : 3}
					required
					className="flex-grow border-2 border-neutral-700 rounded-none px-3 py-2 bg-neutral-900 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors duration-200 font-mono text-sm resize-none"
					disabled={isLoading}
				/>
			</div>
			{error && <p className="mt-2 text-xs text-red-400">{error}</p>}
			<div className="mt-2 flex justify-end gap-3">
				{parentCommentId && onCancelReply && (
					<button
						type="button"
						onClick={onCancelReply}
						disabled={isLoading}
						className="text-neutral-400 hover:text-neutral-200 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-none transition-colors duration-150">
						Cancel
					</button>
				)}
				<button
					type="submit"
					disabled={isLoading || !content.trim()}
					className="bg-pink-600 hover:bg-pink-500 text-neutral-100 font-semibold py-1.5 px-4 rounded-none focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-all duration-200 ease-in-out uppercase tracking-wider text-xs border-2 border-pink-600 hover:border-pink-400 disabled:opacity-50 disabled:cursor-not-allowed">
					{isLoading ? "Posting..." : submitButtonText}
				</button>
			</div>
		</form>
	);
};

export default CommentForm;
