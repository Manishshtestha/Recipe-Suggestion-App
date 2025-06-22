"use client";
import { useEffect, useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import RecipeCardSkeleton from "./RecipeCardSkeleton"; // Assuming a skeleton loader exists

interface Recipe {
	_id: string;
	name: string;
	image: string;
	ingredients: string[];
	nutrition: (string | { name: string; value: string })[];
	mealType: string[];
	dietaryRestrictions: string[];
}

const RecommendedRecipes = ({ recipeId }: { recipeId: string }) => {
	const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!recipeId) return;

		setLoading(true);
		setError(null);
		fetch(`/api/recipes/${recipeId}/recommendations`)
			.then((res) => {
				if (!res.ok) throw new Error("Failed to fetch recommendations");
				return res.json();
			})
			.then((data) => {
				setRecommendedRecipes(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Error fetching recommendations:", err);
				setError(err.message);
				setLoading(false);
			});
	}, [recipeId]);

	if (loading) {
		return (
			<section className="mt-8">
				<h2 className="text-xl md:text-2xl font-semibold mb-4 text-cyan-400 uppercase tracking-wider">
					You Might Also Like
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<RecipeCardSkeleton />
					<RecipeCardSkeleton />
				</div>
			</section>
		);
	}

	if (error) return <div className="text-red-400">{error}</div>;
	if (!recommendedRecipes.length) {
		return <div className="text-neutral-500 mt-8">No specific recommendations found.</div>;
	}

	return (
		<section className="mt-8">
			<h2 className="text-xl md:text-2xl font-semibold mb-4 text-cyan-400 uppercase tracking-wider">
				You Might Also Like
			</h2>
			<RecipeCard data={recommendedRecipes} selectedIngredients={[]} />
		</section>
	);
};

export default RecommendedRecipes; 