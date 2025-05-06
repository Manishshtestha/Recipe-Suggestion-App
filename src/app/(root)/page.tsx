"use client";
import { useState, useEffect } from "react";
import DietryFilter from "../../components/DietryFilter";
import IngredientsSelector from "../../components/IngredientsSelector";
import RecipeCard from "../../components/RecipeCard";
import Searchbar from "../../components/Searchbar";
import SuggestedRecipe from "../../components/SuggestedRecipe";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedDietaryPreference, setSelectedDietaryPreference] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedCookingMethod, setSelectedCookingMethod] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedCookingTime, setSelectedCookingTime] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isFullMode, setIsFullMode] = useState(true);
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

  // Filtering logic for main recipe list
  const filteredRecipes = recipes.filter((recipe) => {
    // Search filter
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      recipe.ingredients.some((ingredient: string) =>
        ingredient.toLowerCase().includes(searchValue.toLowerCase())
      );

    // Dietary preference filter
    const matchesDietary =
      !selectedDietaryPreference ||
      recipe.dietaryRestrictions.includes(selectedDietaryPreference);

    // Cuisine filter
    const matchesCuisine =
      !selectedCuisine || recipe.cuisine === selectedCuisine;

    // Cooking method filter
    const matchesCookingMethod =
      !selectedCookingMethod || recipe.cookingMethod === selectedCookingMethod;

    // Meal type filter
    const matchesMealType =
      !selectedMealType || recipe.mealType === selectedMealType;

    // Cooking time filter
    const matchesCookingTime =
      !selectedCookingTime || recipe.cookingTime === selectedCookingTime;

    return (
      matchesSearch &&
      matchesDietary &&
      matchesCuisine &&
      matchesCookingMethod &&
      matchesMealType &&
      matchesCookingTime
    );
  });

  // Filtering logic for suggested recipes based on selected ingredients
  const filteredSuggestedRecipes = recipes.filter((recipe) =>
    selectedIngredients.every((ingredient) =>
      recipe.ingredients.includes(ingredient)
    )
  );

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
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Recipes</h2>
        <Searchbar
          searchType="recipes"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <DietryFilter
          selectedDietaryPreference={selectedDietaryPreference}
          setSelectedDietaryPreference={setSelectedDietaryPreference}
          selectedCuisine={selectedCuisine}
          setSelectedCuisine={setSelectedCuisine}
          selectedCookingMethod={selectedCookingMethod}
          setSelectedCookingMethod={setSelectedCookingMethod}
          selectedMealType={selectedMealType}
          setSelectedMealType={setSelectedMealType}
          selectedCookingTime={selectedCookingTime}
          setSelectedCookingTime={setSelectedCookingTime}
        />
        {selectedIngredients.length > 0 ? (
          <SuggestedRecipe data={filteredSuggestedRecipes} />
        ) : (
          <RecipeCard data={filteredRecipes} />
        )}
      </div>
    </div>
  );
}
