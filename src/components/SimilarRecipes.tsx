"use client";
import { useEffect, useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import RecipeCardSkeleton from "./RecipeCardSkeleton";

interface Recipe {
	_id: string;
	name: string;
	image: string;
	ingredients: string[];
	nutrition: (string | { name: string; value: string })[];
	mealType: string[];
	dietaryRestrictions: string[];
}

const SimilarRecipes = ({ recipeId }: { recipeId: string }) => {
	const [similarRecipes, setSimilarRecipes] = useState<Recipe[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!recipeId) return;

		setLoading(true);
		setError(null);
		fetch(`/api/recipes/${recipeId}/similar`)
			.then((res) => {
				if (!res.ok) throw new Error("Failed to fetch similar recipes");
				return res.json();
			})
			.then((data) => {
				setSimilarRecipes(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Error fetching similar recipes:", err);
				setError(err.message);
				setLoading(false);
			});
	}, [recipeId]);

	if (loading) {
		return (
			<section className="mt-8">
				<h2 className="text-xl md:text-2xl font-semibold mb-4 text-pink-400 uppercase tracking-wider">
					Similar Recipes
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<RecipeCardSkeleton />
					<RecipeCardSkeleton />
				</div>
			</section>
		);
	}

	if (error) return <div className="text-red-400">{error}</div>;
	if (!similarRecipes.length) {
		return <div className="text-neutral-500 mt-8">No similar recipes found.</div>;
	}

	return (
		<section className="mt-8">
			<h2 className="text-xl md:text-2xl font-semibold mb-4 text-pink-400 uppercase tracking-wider">
				Similar Recipes
			</h2>
			<RecipeCard data={similarRecipes} selectedIngredients={[]} />
		</section>
	);
};

export default SimilarRecipes; 