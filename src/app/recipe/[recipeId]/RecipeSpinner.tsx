"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function RecipeSpinner() {
  const [show, setShow] = useState(false);
  const params = useParams();
  const recipeId = params?.recipeId;

  useEffect(() => {
    setShow(true);
    // Random duration between 200ms and 1000ms
    const duration = Math.random() * (1000 - 200) + 200;
    const timer = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timer);
  }, [recipeId]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 pointer-events-none">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-400 border-solid"></div>
    </div>
  );
} 