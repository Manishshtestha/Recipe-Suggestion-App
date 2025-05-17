"use client";
import { useState, useCallback } from "react";
import CommentsSection from "@/components/CommentSection";
import { FaHeart } from "react-icons/fa";
import { LiaCommentSolid } from "react-icons/lia";
import { FaShare } from "react-icons/fa";

interface InteractiveSectionProps {
	recipeId: string;
	initialLiked: boolean;
	totalLikes: number;
}

export default function InteractiveSection({
	recipeId,
}: InteractiveSectionProps) {
	const [showComments, setShowComments] = useState(false);
	const [liked, setLiked] = useState();
	const [totalLikes, setTotalLikes] = useState();
	const [shareMsg, setShareMsg] = useState("");

	const handleLike = async () => {
		try {
			const response = await fetch(`/api/recipes/${recipeId}/like`, {
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
			setLiked(result.liked);
			setTotalLikes(result.totalLikes);
		} catch (error) {
			console.error("Error liking recipe:", error);
		}
	};

	const handleShare = () => {
		const url = window.location.href;
		navigator.clipboard.writeText(url)
			.then(() => {
				setShareMsg("Link copied!");
				setTimeout(() => setShareMsg(""), 2000);
			})
			.catch(() => {
				setShareMsg("Failed to copy link.");
				setTimeout(() => setShareMsg(""), 2000);
			});
	};

	return (
		<>
			<div className="fixed top-2/5 left-6 flex flex-col items-end gap-y-2 z-50">
				<button
					onClick={handleLike}
					className={`px-4 py-2 rounded-full border shadow transition-all hover:text-pink-400 duration-150 text-3xl ${
						liked ? "text-red-600 border-0" : "text-white border-0"
					}`}>
					<FaHeart /> 
				</button>
				<button
					onClick={() => setShowComments(!showComments)}
					className={`px-4 py-2  shadow transition-all duration-150 hover:text-pink-400 text-3xl ${
						showComments
							? "text-red-600 border-0"
							: "text-white border-0"
					}`}>
					<LiaCommentSolid />
				</button>
				<button
					onClick={handleShare}
					className="px-4 py-2  shadow transition-all duration-150 hover:text-pink-400 text-white text-3xl">
					<FaShare />
				</button>
				{shareMsg && (
					<span className="text-green-400 text-sm mt-1">
						{shareMsg}
					</span>
				)}
			</div>
			{showComments && (
				<div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-neutral-900 border-l-2 border-pink-400 shadow-lg z-40 overflow-y-auto">
					<CommentsSection recipeId={recipeId} />
					<button
						onClick={() => setShowComments(false)}
						className="absolute top-4 right-4 text-pink-400 hover:text-pink-200 text-2xl"
						aria-label="Close comments">
						&times;
					</button>
				</div>
			)}
		</>
	);
}
