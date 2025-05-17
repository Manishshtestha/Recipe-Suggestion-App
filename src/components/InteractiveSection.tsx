"use client";
import { useState, useCallback } from "react";
import CommentsSection from "@/components/CommentSection";

interface InteractiveSectionProps {
	recipeId: string;
	initialLiked: boolean;
	totalLikes: number;
}

export default function InteractiveSection({
	recipeId,
	initialLiked,
	totalLikes: initialTotalLikes,
}: InteractiveSectionProps) {
	const [showComments, setShowComments] = useState(false);
	const [liked, setLiked] = useState(initialLiked);
	const [subscribed, setSubscribed] = useState(false);
	const [totalLikes, setTotalLikes] = useState(initialTotalLikes);

	const handleLike = useCallback(async () => {
		try {
			const response = await fetch(`/api/recipes/${recipeId}/likes`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});

			if (!response.ok) {
				const error = await response.json();
				console.error("Failed to update like:", error);
				return;
			}

			const { liked: newLiked, totalLikes: newTotalLikes } =
				await response.json();
			setLiked(newLiked);
			setTotalLikes(newTotalLikes);
		} catch (error) {
			console.error("Error updating like:", error);
		}
	}, [recipeId]);

	return (
		<>
			<div className="fixed top-1/3 right-6 flex flex-col items-end gap-y-2 z-50">
				<button
					onClick={handleLike}
					className={`px-4 py-2 rounded-full border shadow transition-all duration-150 ${
						liked
							? "bg-cyan-600 border-cyan-400 text-neutral-100"
							: "bg-neutral-800 border-neutral-600 text-cyan-300 hover:bg-neutral-700"
					}`}>
					{liked ? "Unlike" : "Like"} ({totalLikes})
				</button>
				<button
					onClick={() => setShowComments(!showComments)}
					className={`px-4 py-2 rounded-full border shadow transition-all duration-150 ${
						showComments
							? "bg-pink-600 border-pink-400 text-neutral-100"
							: "bg-neutral-800 border-neutral-600 text-cyan-300 hover:bg-neutral-700"
					}`}>
					{showComments ? "Hide Comments" : "Show Comments"}
				</button>
				<button
					onClick={() => setSubscribed(!subscribed)}
					className={`px-4 py-2 rounded-full border shadow transition-all duration-150 ${
						subscribed
							? "bg-green-600 border-green-400 text-neutral-100"
							: "bg-neutral-800 border-neutral-600 text-cyan-300 hover:bg-neutral-700"
					}`}>
					{subscribed ? "Unsubscribe" : "Subscribe"}
				</button>
			</div>
			{showComments && (
				<div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-neutral-900 border-l-2 border-pink-400 shadow-lg z-40 overflow-y-auto">
					<CommentsSection recipeId={recipeId} />
					<button
						onClick={() => setShowComments(false)}
						className="absolute top-4 right-4 text-pink-400 hover:text-pink-200 text-2xl"
						aria-label="Close comments"
					>
						&times;
					</button>
				</div>
			)}
		</>
	);
}
