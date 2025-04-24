"use client";
import { useState } from "react";
import DietryFilter from "../components/DietryFilter";
import IngredientsSelector from "../components/IngredientsSelector";
import RecipeCard from "../components/RecipeCard";
import Searchbar from "../components/Searchbar";
import SuggestedRecipe from "../components/SuggestedRecipe";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedDietaryPreference, setSelectedDietaryPreference] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedCookingMethod, setSelectedCookingMethod] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedCookingTime, setSelectedCookingTime] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const recipes = [
    {
      id: 1,
      name: "Spaghetti Bolognese",
      image: "https://example.com/spaghetti.jpg",
      ingredients: ["spaghetti", "ground beef", "tomato sauce"],
      dietaryRestrictions: ["gluten-free"],
      cuisine: "italian",
      cookingMethod: "boiling",
      mealType: "dinner",
      cookingTime: "30-60-minutes",
    },
    {
      id: 2,
      name: "Chicken Curry",
      image: "https://example.com/curry.jpg",
      ingredients: ["chicken", "curry powder", "coconut milk"],
      dietaryRestrictions: ["dairy-free"],
      cuisine: "indian",
      cookingMethod: "boiling",
      mealType: "dinner",
      cookingTime: "30-60-minutes",
    },
    {
      id: 3,
      name: "Rice Pudding",
      image: "https://example.com/rice-pudding.jpg",
      ingredients: ["rice", "milk", "sugar", "cinnamon"],
      dietaryRestrictions: ["vegetarian"],
      cuisine: "dessert",
      cookingMethod: "boiling",
      mealType: "dessert",
      cookingTime: "30-60-minutes",
    },
  ];

  // Filtering logic for main recipe list
  const filteredRecipes = recipes.filter((recipe) => {
    // Search filter
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
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
    <div className="flex flex-col w-[90%] mx-auto gap-3">
      <IngredientsSelector
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />
      <div className="w-full flex flex-col gap-3 border rounded-2xl p-4">
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
