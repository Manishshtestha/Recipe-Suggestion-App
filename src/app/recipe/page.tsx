"use client";
import { useState, useEffect } from "react";
// import DietryFilter from "@/components/DietryFilter";
import RecipeCard from "@/components/RecipeCard";
import Searchbar from "@/components/Searchbar";
import RecipeCardSkeleton from "@/components/RecipeCardSkeleton";

export default function Recipe() {
	const [searchValue, setSearchValue] = useState("");
	// const [selectedDietaryPreference, setSelectedDietaryPreference] =
	// 	useState("");
	// const [selectedCuisine, setSelectedCuisine] = useState("");
	// const [selectedCookingMethod, setSelectedCookingMethod] = useState("");
	// const [selectedMealType, setSelectedMealType] = useState("");
	// const [selectedCookingTime, setSelectedCookingTime] = useState("");
	const [recipes, setRecipes] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalRecipes, setTotalRecipes] = useState(0);
	const [loadingMore, setLoadingMore] = useState(false);
	const limit = 10;

	const fetchRecipes = async (pageNum: number) => {
		if (pageNum === 1) setLoading(true);
		else setLoadingMore(true);

		try {
			const response = await fetch(
				`/api/recipes?page=${pageNum}&limit=${limit}`
			);
			if (response.ok) {
				const data = await response.json();
				setRecipes((prev) =>
					pageNum === 1 ? data.recipes : [...prev, ...data.recipes]
				);
				setTotalRecipes(data.totalRecipes);
			} else {
				console.error("Failed to fetch recipes");
			}
		} catch (error) {
			console.error("Error fetching recipes:", error);
		} finally {
			if (pageNum === 1) setLoading(false);
			else setLoadingMore(false);
		}
	};

	useEffect(() => {
		fetchRecipes(1);
	}, []);

	const handleLoadMore = () => {
		const nextPage = page + 1;
		setPage(nextPage);
		fetchRecipes(nextPage);
	};

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
			{loading ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					{Array.from({ length: 10 }).map((_, index) => (
						<RecipeCardSkeleton key={index} />
					))}
				</div>
			) : (
				<>
					<RecipeCard data={filteredRecipes} selectedIngredients={[]} />
					{loadingMore && (
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
							{Array.from({ length: 2 }).map((_, index) => (
								<RecipeCardSkeleton key={index} />
							))}
						</div>
					)}
					{recipes.length < totalRecipes && !loadingMore && (
						<button
							onClick={handleLoadMore}
							className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full mt-4 w-full sm:w-auto mx-auto"
							disabled={loadingMore}>
							{loadingMore ? "Loading..." : "Load More Recipes"}
						</button>
					)}
				</>
			)}
		</div>
	);
}
