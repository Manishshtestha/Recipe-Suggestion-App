"use client";
import SimilarRecipes from "@/components/SimilarRecipes";

export default function SimilarRecipesClientWrapper({ recipeId }: { recipeId: string }) {
  return <SimilarRecipes recipeId={recipeId} />;
} 