"use client";
import { useState, useEffect, useMemo } from "react";
import IngredientsSelector from "@/src/../components/IngredientsSelector";
import RecipeCard from "../../components/RecipeCard";
import Searchbar from "../../components/Searchbar";
import SuggestedRecipe from "../../components/SuggestedRecipe";

export default function Home() {
	const [searchValue, setSearchValue] = useState("");
	const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
		[]
	);
	const [isFullMode, setIsFullMode] = useState(true);
	const [recipes, setRecipes] = useState<any[]>([]);
	const [sortOption, setSortOption] = useState<
		"most-matched" | "alphabetical" | "ingredient-count"
	>("most-matched");

	useEffect(() => {
		async function fetchRecipes() {
			try {
				const response = await fetch("/api/recipes");
				if (response.ok) {
					const data = await response.json();
					setRecipes(data);
				} else {
					console.error("Failed to fetch recipes");
				}
			} catch (error) {
				console.error("Error fetching recipes:", error);
			}
		}
		fetchRecipes();
	}, []);

	// Move selectedIngredientsLowerTrimmed before filteredRecipes
	const selectedIngredientsLowerTrimmed = selectedIngredients.map(
		(ingredient) => ingredient.trim().toLowerCase()
	);

	// Filtering logic for main recipe list
	const filteredRecipes = useMemo(() => {
		let filtered = recipes.filter((recipe) => {
			const matchesSearch =
				recipe.name.toLowerCase().includes(searchValue.toLowerCase()) ||
				recipe.ingredients.some((ingredient: string) =>
					ingredient.toLowerCase().includes(searchValue.toLowerCase())
				);
			return matchesSearch;
		});

		// Apply sorting based on sortOption
		if (sortOption === "alphabetical") {
			filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
		} else if (sortOption === "ingredient-count") {
			filtered = filtered.sort(
				(a, b) => b.ingredients.length - a.ingredients.length
			);
		} else if (
			sortOption === "most-matched" &&
			selectedIngredients.length > 0
		) {
			filtered = filtered.sort((a, b) => {
				const aMatches = a.ingredients.filter((ing: string) =>
					selectedIngredientsLowerTrimmed.includes(
						ing.trim().toLowerCase()
					)
				).length;
				const bMatches = b.ingredients.filter((ing: string) =>
					selectedIngredientsLowerTrimmed.includes(
						ing.trim().toLowerCase()
					)
				).length;
				return bMatches - aMatches;
			});
		}

		return filtered;
	}, [recipes, searchValue, sortOption, selectedIngredients]);

	// Filtering and sorting logic for suggested recipes based on selected ingredients
	const filteredSuggestedRecipes = useMemo(() => {
		// Filter recipes that include at least one selected ingredient
		let filtered = recipes.filter((recipe) =>
			selectedIngredientsLowerTrimmed.some((selectedIngredient) =>
				recipe.ingredients.some((recipeIngredient: string) =>
					recipeIngredient
						.trim()
						.toLowerCase()
						.includes(selectedIngredient)
				)
			)
		);

		// Apply sorting based on sortOption
		if (sortOption === "alphabetical") {
			filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
		} else if (sortOption === "ingredient-count") {
			filtered = filtered.sort(
				(a, b) => b.ingredients.length - a.ingredients.length
			);
		} else if (sortOption === "most-matched") {
			filtered = filtered.sort((a, b) => {
				const aMatches = a.ingredients.filter((ing: string) =>
					selectedIngredientsLowerTrimmed.includes(
						ing.trim().toLowerCase()
					)
				).length;
				const bMatches = b.ingredients.filter((ing: string) =>
					selectedIngredientsLowerTrimmed.includes(
						ing.trim().toLowerCase()
					)
				).length;
				return bMatches - aMatches;
			});
		}

		return filtered;
	}, [recipes, selectedIngredientsLowerTrimmed, sortOption]);

	return (
		<div className="flex w-full min-h-screen">
			<IngredientsSelector
				selectedIngredients={selectedIngredients}
				setSelectedIngredients={setSelectedIngredients}
				isFullMode={isFullMode}
				setIsFullMode={setIsFullMode}
			/>
			<div
				className={`flex-1 flex flex-col gap-3 p-4 transition-all duration-300 ${
					isFullMode ? "ml-72" : "ml-20"
				}`}>
				<h2 className="text-2xl font-bold mb-4">Recipes</h2>
				<div className="flex gap-4 items-center">
					<Searchbar
						searchType="recipes"
						searchValue={searchValue}
						setSearchValue={setSearchValue}
					/>
					<select
						value={sortOption}
						onChange={(e) =>
							setSortOption(e.target.value as typeof sortOption)
						}
						className="p-2 border text-gray-0 text-pink-500 hover:text-pink-300 hover:bg-black transition-all focus:outline-none">
						<option value="most-matched">Most Matched</option>
						<option value="alphabetical">Alphabetical</option>
						<option value="ingredient-count">
							Ingredient Count
						</option>
					</select>
				</div>
				{selectedIngredients.length > 0 ? (
					<SuggestedRecipe
						data={filteredSuggestedRecipes}
						col_count={2}
					/>
				) : (
					<RecipeCard
						data={filteredRecipes}
						col_count={2}
						selectedIngredients={selectedIngredients}
					/>
				)}
			</div>
		</div>
	);
}