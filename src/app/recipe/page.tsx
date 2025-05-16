"use client";
import { useState, useEffect } from "react";
// import DietryFilter from "@/components/DietryFilter";
import RecipeCard from "@/components/RecipeCard";
import Searchbar from "@/components/Searchbar";

export default function Recipe() {
	const [searchValue, setSearchValue] = useState("");
	// const [selectedDietaryPreference, setSelectedDietaryPreference] =
	// 	useState("");
	// const [selectedCuisine, setSelectedCuisine] = useState("");
	// const [selectedCookingMethod, setSelectedCookingMethod] = useState("");
	// const [selectedMealType, setSelectedMealType] = useState("");
	// const [selectedCookingTime, setSelectedCookingTime] = useState("");
	const [recipes, setRecipes] = useState<any[]>([]);

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

	// Filtering logic
	const filteredRecipes = recipes.filter((recipe) => {
		// Search filter
		const matchesSearch =
			recipe.name.toLowerCase().includes(searchValue.toLowerCase()) ||
			recipe.ingredients.some((ingredient: string) =>
				ingredient.toLowerCase().includes(searchValue.toLowerCase())
			);

		// // Dietary preference filter
		// const matchesDietary =
		// 	!selectedDietaryPreference ||
		// 	recipe.dietaryRestrictions.includes(selectedDietaryPreference);

		// // Cuisine filter
		// const matchesCuisine =
		// 	!selectedCuisine || recipe.cuisine === selectedCuisine;

		// // Cooking method filter
		// const matchesCookingMethod =
		// 	!selectedCookingMethod ||
		// 	recipe.cookingMethod === selectedCookingMethod;

		// // Meal type filter
		// const matchesMealType =
		// 	!selectedMealType || recipe.mealType === selectedMealType;

		// // Cooking time filter
		// const matchesCookingTime =
		// 	!selectedCookingTime || recipe.cookingTime === selectedCookingTime;

		return matchesSearch;
		// &&
		// matchesDietary &&
		// matchesCuisine &&
		// matchesCookingMethod &&
		// matchesMealType &&
		// matchesCookingTime
	});

	return (
		<div className="flex flex-col w-[90%] mx-auto gap-3">
			<h2 className="text-2xl font-bold mb-4">Recipes</h2>
			<Searchbar
				searchType="recipes"
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>
			<RecipeCard data={filteredRecipes} col_count={2} selectedIngredients={[]}/>
		</div>
	);
}
