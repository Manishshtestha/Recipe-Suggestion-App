"use client";
import { useState,useEffect} from "react";

export default function RecipeInsertPage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([""]);
  const [cuisine, setCuisine] = useState("");
  const [cookingMethod, setCookingMethod] = useState("");
  const [mealType, setMealType] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [cookingInstructions, setCookingInstructions] = useState<string[]>([""]);
  const [nurition, setNurition] = useState<string[]>([""]);
  const [message, setMessage] = useState("");

  const handleArrayChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string,
    array: string[]
  ) => {
    const newArray = [...array];
    newArray[index] = value;
    setter(newArray);
  };

  const addArrayField = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    array: string[]
  ) => {
    setter([...array, ""]);
  };

  const removeArrayField = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    array: string[],
    index: number
  ) => {
    const newArray = array.filter((_, i) => i !== index);
    setter(newArray);
  };

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
		if (image && isValidUrl(image)) {
			setImagePreview(image);
		} else {
			setImagePreview("");
		}
  }, [image]);

  const isValidUrl = (url: string) => {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const recipeData = {
      name,
      image,
      ingredients: ingredients.filter((i) => i.trim() !== ""),
      dietaryRestrictions: dietaryRestrictions.filter((i) => i.trim() !== ""),
      cuisine,
      cookingMethod,
      mealType,
      cookingTime,
      cookingInstructions: cookingInstructions.filter((i) => i.trim() !== ""),
      nurition: nurition.filter((i) => i.trim() !== ""),
    };

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        setMessage("Recipe inserted successfully!");
        // Reset form
        setName("");
        setImage("");
        setIngredients([""]);
        setDietaryRestrictions([""]);
        setCuisine("");
        setCookingMethod("");
        setMealType("");
        setCookingTime("");
        setCookingInstructions([""]);
        setNurition([""]);
      } else {
        setMessage("Failed to insert recipe.");
      }
    } catch (error) {
      setMessage("Error inserting recipe.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Insert New Recipe</h1>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border p-2"
          />
        </label>
        <label>
          Image URL:
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full border p-2"
          />
        </label>
        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}

        <fieldset>
          <legend>Ingredients:</legend>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) =>
                  handleArrayChange(setIngredients, index, e.target.value, ingredients)
                }
                required
                className="flex-1 border p-2"
              />
              <button
                type="button"
                onClick={() => removeArrayField(setIngredients, ingredients, index)}
                disabled={ingredients.length === 1}
                className="bg-red-500 text-white px-2 rounded disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField(setIngredients, ingredients)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Ingredient
          </button>
        </fieldset>

        <fieldset>
          <legend>Dietary Restrictions:</legend>
          {dietaryRestrictions.map((restriction, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={restriction}
                onChange={(e) =>
                  handleArrayChange(
                    setDietaryRestrictions,
                    index,
                    e.target.value,
                    dietaryRestrictions
                  )
                }
                required
                className="flex-1 border p-2"
              />
              <button
                type="button"
                onClick={() =>
                  removeArrayField(setDietaryRestrictions, dietaryRestrictions, index)
                }
                disabled={dietaryRestrictions.length === 1}
                className="bg-red-500 text-white px-2 rounded disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField(setDietaryRestrictions, dietaryRestrictions)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Dietary Restriction
          </button>
        </fieldset>

        <label>
          Cuisine:
          <input
            type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            required
            className="w-full border p-2"
          />
        </label>
        <label>
          Cooking Method:
          <input
            type="text"
            value={cookingMethod}
            onChange={(e) => setCookingMethod(e.target.value)}
            required
            className="w-full border p-2"
          />
        </label>
        <label>
          Meal Type:
          <input
            type="text"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            required
            className="w-full border p-2"
          />
        </label>
        <label>
          Cooking Time:
          <input
            type="text"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            required
            className="w-full border p-2"
          />
        </label>

        <fieldset>
          <legend>Cooking Instructions:</legend>
          {cookingInstructions.map((instruction, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={instruction}
                onChange={(e) =>
                  handleArrayChange(
                    setCookingInstructions,
                    index,
                    e.target.value,
                    cookingInstructions
                  )
                }
                required
                className="flex-1 border p-2"
              />
              <button
                type="button"
                onClick={() =>
                  removeArrayField(setCookingInstructions, cookingInstructions, index)
                }
                disabled={cookingInstructions.length === 1}
                className="bg-red-500 text-white px-2 rounded disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField(setCookingInstructions, cookingInstructions)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Instruction
          </button>
        </fieldset>

        <fieldset>
          <legend>Nutrition:</legend>
          {nurition.map((nutrient, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={nutrient}
                onChange={(e) =>
                  handleArrayChange(setNurition, index, e.target.value, nurition)
                }
                required
                className="flex-1 border p-2"
              />
              <button
                type="button"
                onClick={() => removeArrayField(setNurition, nurition, index)}
                disabled={nurition.length === 1}
                className="bg-red-500 text-white px-2 rounded disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField(setNurition, nurition)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Nutrition
          </button>
        </fieldset>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded mt-4 hover:bg-green-700"
        >
          Insert Recipe
        </button>
      </form>
    </div>
  );
}
