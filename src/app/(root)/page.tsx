"use client";
import { useState, useEffect, useMemo } from "react";
import IngredientsSelector from "@/src/../components/IngredientsSelector";
import RecipeCard from "../../components/RecipeCard";
import Searchbar from "../../components/Searchbar";
import SuggestedRecipe from "../../components/SuggestedRecipe";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
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
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      recipe.ingredients.some((ingredient: string) =>
        ingredient.toLowerCase().includes(searchValue.toLowerCase())
      );
    return matchesSearch;
  });

  // Filtering and sorting logic for suggested recipes based on selected ingredients
  const selectedIngredientsLowerTrimmed = selectedIngredients.map((ingredient) =>
    ingredient.trim().toLowerCase()
  );

  const filteredSuggestedRecipes = useMemo(() => {
    // Filter recipes that include at least one selected ingredient
    const filtered = recipes.filter((recipe) =>
      selectedIngredientsLowerTrimmed.some((selectedIngredient) =>
        recipe.ingredients.some((recipeIngredient: string) =>
          recipeIngredient.trim().toLowerCase().includes(selectedIngredient)
        )
      )
    );

    // Sort recipes by number of ingredients in descending order
    return filtered.sort((a, b) => b.ingredients.length - a.ingredients.length);
  }, [recipes, selectedIngredientsLowerTrimmed]);

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
        <h2 className="text-2xl font-bold mb-4"></h2>
        <Searchbar
          searchType="recipes"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        {selectedIngredients.length > 0 ? (
          <SuggestedRecipe data={filteredSuggestedRecipes} col_count={1} />
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