"use client";
import { useEffect, useState } from "react";
import RecipeCard from "@/components/RecipeCard";

interface Recipe {
  _id: string;
  name: string;
  image: string;
  ingredients: string[];
  nutrition: (string | { name: string; value: string })[];
  mealType: string[];
  dietaryRestrictions: string[];
}

function getRandomItems<T>(arr: T[], n: number): T[] {
  if (arr.length <= n) return arr;
  const result: T[] = [];
  const taken = new Set<number>();
  while (result.length < n) {
    const idx = Math.floor(Math.random() * arr.length);
    if (!taken.has(idx)) {
      result.push(arr[idx]);
      taken.add(idx);
    }
  }
  return result;
}

const SimilarRecipes = ({ recipeId }: { recipeId: string }) => {
  const [similarRecipes, setSimilarRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        setError(err.message);
        setLoading(false);
      });
  }, [recipeId]);

  if (loading) return <div className="text-neutral-500">Loading similar recipes...</div>;
  if (error) return <div className="text-red-400">{error}</div>;
  if (!similarRecipes.length) return <div className="text-neutral-500">No similar recipes found.</div>;

  // Pick at most 2, random if more than 2
  const recipesToShow = getRandomItems(similarRecipes, 2);

  return (
    <section className="mt-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-cyan-400 uppercase tracking-wider">Similar Recipes</h2>
      <RecipeCard data={recipesToShow} selectedIngredients={[]} />
    </section>
  );
};

export default SimilarRecipes; 