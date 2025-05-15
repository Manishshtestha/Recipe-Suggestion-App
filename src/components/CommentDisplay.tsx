"use client";

import React, { useState, useEffect } from "react";
import { IComment } from "@/app/_lib/models/commentModel"; // Import comment type
import { formatDistanceToNow } from "date-fns"; // For relative timestamps
import { useRouter } from "next/navigation"; // Import useRouter

interface CommentDisplayProps {
	comment: IComment & {
		user: { _id: string; name: string /* Add avatar field if needed */ };
	}; // Ensure user is populated with name
	recipeId: string;
	currentUserId?: string | null; // ID of the currently logged-in user
	onReplyAdded: (newReply: any) => void;
	onCommentDeleted: (commentId: string) => void;
	// Add props for like/report handling if needed here
}

const CommentDisplay: React.FC<CommentDisplayProps> = ({
	comment,
	recipeId,
	currentUserId,
	onReplyAdded,
	onCommentDeleted,
}) => {
	const router = useRouter(); // Initialize useRouter
	const [isEditing, setIsEditing] = useState(false);
	const [editedContent, setEditedContent] = useState(comment.content);
	const [editLoading, setEditLoading] = useState(false);
	const [editError, setEditError] = useState<string | null>(null);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [deleteError, setDeleteError] = useState<string | null>(null);
	
	// Add states for like/report loading/error if implementing here

	const isOwner = currentUserId === comment.user._id;
	const relativeTime = formatDistanceToNow(new Date(comment.createdAt), {
		addSuffix: true,
	});

	// --- Action Handlers ---

	const handleLike = async () => {
		try {
			const response = await fetch(`/api/comments/${comment._id}/like`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.status === 401) {
				// Unauthorized, redirect to login page
				window.location.href = "/login";
				return;
			}
			if (!response.ok) {
				const result = await response.json();
				throw new Error(result.error || "Failed to update like.");
			}
			const result = await response.json();
			// Optionally update UI optimistically here, e.g., update likes count
			// For now, just log the result
			console.log(result.message, "Likes count:", result.likesCount);
		} catch (error) {
			console.error("Error liking comment:", error);
		}
	};

	const handleDelete = async () => {
		if (
			!isOwner ||
			!window.confirm("Are you sure you want to delete this comment?")
		)
			return;

		setDeleteLoading(true);
		setDeleteError(null);
		try {
			const response = await fetch(`/api/comments/${comment._id}`, {
				method: "DELETE",
				// Add Authorization header if needed
			});
			if (!response.ok) {
				const result = await response.json();
				throw new Error(result.message || "Failed to delete comment.");
			}
			router.refresh();
			// onCommentDeleted(comment._id); // Notify parent
		} catch (err: any) {
			setDeleteError(err.message);
		} finally {
			setDeleteLoading(false);
		}
	};

	const handleEditToggle = () => {
		setIsEditing(!isEditing);
		setEditedContent(comment.content); // Reset content on toggle
		setEditError(null); // Clear previous edit errors
	};

	const handleEditSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!editedContent.trim() || editedContent === comment.content) {
			setIsEditing(false); // Just close if no change or empty
			return;
		}
		setEditLoading(true);
		setEditError(null);
		try {
			const response = await fetch(`/api/comments/${comment._id}`, {
				method: "PUT", // or PATCH
				headers: {
					"Content-Type": "application/json" /*, Authorization */,
				},
				body: JSON.stringify({ content: editedContent.trim() }),
			});
			const result = await response.json();
			if (!response.ok) {
				throw new Error(result.message || "Failed to update comment.");
			}
			setIsEditing(false); // Close edit form
			router.refresh(); // Refresh the current page after successful update
		} catch (err: any) {
			setEditError(err.message);
		} finally {
			setEditLoading(false);
		}
	};

	const handleReport = async () => {
		// TODO: Implement Report API Call
		console.log("Report action for comment:", comment._id);
		if (!window.confirm("Are you sure you want to report this comment?"))
			return;
		// API Call: POST /api/comments/[commentId]/report
		// Give user feedback (e.g., "Comment reported")
	};

	// --- Render ---
	return (
		<div className="flex space-x-3 py-2">
			{/* User Avatar Placeholder */}
			<div className="flex-shrink-0 w-8 h-8 bg-cyan-700 rounded-full flex items-center justify-center text-sm font-bold text-neutral-100">
				{comment.user?.name?.charAt(0).toUpperCase() || "?"}
			</div>

			<div className="flex-grow">
				{/* Author and Time */}
				<div className="flex items-center gap-2 text-xs mb-0.5">
					<span className="font-semibold text-cyan-400">
						{comment.user?.name || "Unknown User"}
					</span>
					<span
						className="text-neutral-500"
						title={new Date(comment.createdAt).toLocaleString()}>
						{relativeTime} {comment.isEdited && "(edited)"}
					</span>
				</div>

				{/* Content or Edit Form */}
				{isEditing ? (
					<form onSubmit={handleEditSubmit} className="mt-1">
						<textarea
							value={editedContent}
							onChange={(e) => setEditedContent(e.target.value)}
							rows={3}
							required
							className="w-full border-2 border-neutral-600 rounded-none px-3 py-2 bg-neutral-800 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors duration-200 font-mono text-sm resize-none"
							disabled={editLoading}
						/>
						{editError && (
							<p className="mt-1 text-xs text-red-400">
								{editError}
							</p>
						)}
						<div className="mt-1.5 flex justify-end gap-2">
							<button
								type="button"
								onClick={handleEditToggle}
								disabled={editLoading}
								className="text-neutral-400 hover:text-neutral-200 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-none transition-colors">
								Cancel
							</button>
							<button
								type="submit"
								disabled={editLoading || !editedContent.trim()}
								className="bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-none transition-colors disabled:opacity-50">
								{editLoading ? "Saving..." : "Save"}
							</button>
						</div>
					</form>
				) : (
					<p className="text-sm text-neutral-300 whitespace-pre-wrap break-words">
						{comment.content}
					</p>
				)}

				{/* Action Buttons */}
				{!isEditing && (
					<div className="mt-1.5 flex items-center space-x-4 text-xs">
						<button
							onClick={handleLike}
							className="text-neutral-400 hover:text-pink-400 transition-colors flex items-center gap-1"
							title="Like">
							{/* Like Icon Placeholder */}
							<svg
								className="w-3.5 h-3.5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
							</svg>
							<span>{comment.likes?.length || 0}</span>
						</button>
						{isOwner && (
							<button
								onClick={handleEditToggle}
								className="text-neutral-400 hover:text-green-400 transition-colors"
								title="Edit"
								disabled={deleteLoading}>
								Edit
							</button>
						)}
						{isOwner && ( // Add condition for moderators/admins later if needed
							<button
								onClick={handleDelete}
								disabled={deleteLoading}
								className="text-neutral-400 hover:text-red-400 transition-colors disabled:opacity-50"
								title="Delete">
								{deleteLoading ? "Deleting..." : "Delete"}
							</button>
						)}
						{!isOwner &&
							currentUserId && ( // Allow reporting if logged in and not owner
								<button
									onClick={handleReport}
									// disabled={reportLoading} // Add loading state if needed
									className="text-neutral-400 hover:text-yellow-400 transition-colors"
									title="Report">
									Report
								</button>
							)}
					</div>
				)}
				{deleteError && (
					<p className="mt-1 text-xs text-red-400">{deleteError}</p>
				)}

			</div>
		</div>
	);
};

export default CommentDisplay;
