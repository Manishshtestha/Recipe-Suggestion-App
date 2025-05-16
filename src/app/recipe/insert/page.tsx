"use client";
import { useState, useEffect } from "react";

export default function RecipeInsertPage() {
	const [name, setName] = useState("");
	const [image, setImage] = useState("");
	const [ingredients, setIngredients] = useState<string[]>([""]);
	const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([
		"",
	]);
	const [cuisine, setCuisine] = useState("");
	const [cookingMethod, setCookingMethod] = useState("");
	const [mealType, setMealType] = useState("");
	const [cookingTime, setCookingTime] = useState("");
	const [cookingInstructions, setCookingInstructions] = useState<string[]>([
		"",
	]);
	const [nutrition, setNutrition] = useState<string[]>([""]);
	const [calories, setCalories] = useState("");
	const [protein, setProtein] = useState("");
	const [fat, setFat] = useState("");
	const [carbohydrates, setCarbohydrates] = useState("");
	const [cholesterol, setCholesterol] = useState("");
	const [sodium, setSodium] = useState("");
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
			dietaryRestrictions: dietaryRestrictions.filter(
				(i) => i.trim() !== ""
			),
			cuisine,
			cookingMethod,
			mealType,
			cookingTime,
			cookingInstructions: cookingInstructions.filter(
				(i) => i.trim() !== ""
			),
			calories,
			protein,
			fat,
			carbohydrates,
			cholesterol,
			sodium,
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
				setCalories("");
				setProtein("");
				setFat("");
				setCarbohydrates("");
				setCholesterol("");
				setSodium("");
			} else {
				setMessage("Failed to insert recipe.");
			}
		} catch (error) {
			setMessage("Error inserting recipe.");
		}
	};

	return (
		<div className="max-w-3xl mx-auto mt-10 p-4 border-2 border-neutral-700  backdrop-blur-sm rounded-none hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.5),0_0_5px_rgba(0,255,255,0.8)_inset] transition-all duration-300 ease-in-out h-[90vh] overflow-y-scroll">
			<h1 className="text-3xl font-bold mb-6 text-pink-400 uppercase tracking-wider">
				Insert New Recipe
			</h1>
			{message && <p className="mb-4 text-green-400">{message}</p>}
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<label className="text-cyan-300">
					Name:
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						className="w-full border-2 border-neutral-700 bg-neutral-900 text-cyan-400 p-2 mt-1 focus:border-pink-500 focus:shadow-[0_0_10px_rgba(236,72,153,0.5)] focus:outline-none transition-all duration-300 ease-in-out font-mono"
					/>
				</label>
				<label className="text-cyan-300 uppercase text-sm">
					Image URL:{" "}
					<span className="text-neutral-500">(Direct link)</span>
					<input
						type="url"
						value={image}
						onChange={(e) => setImage(e.target.value)}
						required
						className="w-full border-2 border-neutral-700 bg-neutral-900 text-cyan-400 p-2 mt-1 focus:border-pink-500 focus:shadow-[0_0_10px_rgba(236,72,153,0.5)] focus:outline-none transition-all duration-300 ease-in-out font-mono"
					/>
				</label>
				{imagePreview && (
					<div className="mb-4 border-2 border-neutral-600 p-1">
						<img
							src={imagePreview}
							alt="Image Preview"
							className="w-full h-auto object-cover rounded-none"
						/>
					</div>
				)}

				<fieldset className="border-2 border-neutral-700 p-4 group hover:border-pink-500 transition-colors duration-300 ease-in-out">
					<legend className="text-cyan-300 group-hover:text-pink-400 font-bold px-2 uppercase transition-colors duration-300 ease-in-out">
						// Data Block: Ingredients
					</legend>
					{ingredients.map((ingredient, index) => (
						<div
							key={index}
							className="flex gap-2 mb-2 items-center">
							<input
								type="text"
								value={ingredient}
								onChange={(e) =>
									handleArrayChange(
										setIngredients,
										index,
										e.target.value,
										ingredients
									)
								}
								required
								className="flex-1 border-2 border-neutral-700 bg-neutral-900 text-neutral-300 p-2 focus:border-cyan-400 focus:outline-none transition-colors duration-300 ease-in-out font-mono"
							/>
							<button
								type="button"
								onClick={() =>
									removeArrayField(
										setIngredients,
										ingredients,
										index
									)
								}
								disabled={ingredients.length === 1}
								className="border-2 border-red-700 bg-transparent text-red-400 px-3 py-1 disabled:opacity-50 hover:border-pink-500 hover:text-pink-400 transition-all duration-300 ease-in-out text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
								<span className="hidden sm:inline">
									[ Remove ]
								</span>
								<span className="inline sm:hidden">
									[ Del ]
								</span>
							</button>
						</div>
					))}
					<button
						type="button"
						onClick={() =>
							addArrayField(setIngredients, ingredients)
						}
						className="border-2 border-pink-500 bg-transparent text-pink-400 px-4 py-2 mt-2 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 ease-in-out uppercase text-sm font-bold focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50">
						+ Add Ingredient Data
					</button>
				</fieldset>

				<fieldset className="border-2 border-neutral-700 p-4 group hover:border-pink-500 transition-colors duration-300 ease-in-out">
					<legend className="text-cyan-300 group-hover:text-pink-400 font-bold px-2 uppercase transition-colors duration-300 ease-in-out">
						// Data Block: Dietary Restrictions
					</legend>
					{dietaryRestrictions.map((restriction, index) => (
						<div
							key={index}
							className="flex gap-2 mb-2 items-center">
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
								className="flex-1 border-2 border-neutral-700 bg-neutral-900 text-neutral-300 p-2 focus:border-cyan-400 focus:outline-none transition-colors duration-300 ease-in-out font-mono"
							/>
							<button
								type="button"
								onClick={() =>
									removeArrayField(
										setDietaryRestrictions,
										dietaryRestrictions,
										index
									)
								}
								disabled={dietaryRestrictions.length === 1}
								className="border-2 border-red-700 bg-transparent text-red-400 px-3 py-1 disabled:opacity-50 hover:border-pink-500 hover:text-pink-400 transition-all duration-300 ease-in-out text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
								<span className="hidden sm:inline">
									[ Remove ]
								</span>
								<span className="inline sm:hidden">
									[ Del ]
								</span>
							</button>
						</div>
					))}
					<button
						type="button"
						onClick={() =>
							addArrayField(
								setDietaryRestrictions,
								dietaryRestrictions
							)
						}
						className="border-2 border-pink-500 bg-transparent text-pink-400 px-4 py-2 mt-2 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 ease-in-out uppercase text-sm font-bold focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50">
						+ Add Dietary Restriction Data
					</button>
				</fieldset>
				<div className="grid grid-cols-3 gap-2">
					<label className="text-cyan-300 uppercase text-sm">
						Cuisine:
						<select
							className="w-full border-2 border-neutral-700 bg-neutral-900 text-cyan-400 p-2 mt-1 focus:border-pink-500 focus:shadow-[0_0_10px_rgba(236,72,153,0.5)] focus:outline-none transition-all duration-300 ease-in-out font-mono"
							onChange={(e) => setCuisine(e.target.value)}
							value={cuisine}>
							<option value="">Select cuisine</option>
							<option value="italian">Italian</option>
							<option value="mexican">Mexican</option>
							<option value="indian">Indian</option>
							<option value="chinese">Chinese</option>
							<option value="japanese">Japanese</option>
							<option value="mediterranean">Mediterranean</option>
							<option value="american">American</option>
							<option value="thai">Thai</option>
							<option value="french">French</option>
							<option value="spanish">Spanish</option>
							<option value="middle-eastern">
								Middle Eastern
							</option>
							<option value="korean">Korean</option>
						</select>
					</label>
					<label className="text-cyan-300 uppercase text-sm">
						Cooking Method:
						<select
							className="w-full border-2 border-neutral-700 bg-neutral-900 text-cyan-400 p-2 mt-1 focus:border-pink-500 focus:shadow-[0_0_10px_rgba(236,72,153,0.5)] focus:outline-none transition-all duration-300 ease-in-out font-mono"
							onChange={(e) => setCookingMethod(e.target.value)}
							value={cookingMethod}>
							<option value="">Select cooking method</option>
							<option value="baking">Baking</option>
							<option value="grilling">Grilling</option>
							<option value="boiling">Boiling</option>
							<option value="steaming">Steaming</option>
							<option value="frying">Frying</option>
							<option value="roasting">Roasting</option>
						</select>
					</label>
					<label className="text-cyan-300 uppercase text-sm">
						Meal Type:
						<select
							className="w-full border-2 border-neutral-700 bg-neutral-900 text-cyan-400 p-2 mt-1 focus:border-pink-500 focus:shadow-[0_0_10px_rgba(236,72,153,0.5)] focus:outline-none transition-all duration-300 ease-in-out font-mono"
							onChange={(e) => setMealType(e.target.value)}
							value={mealType}>
							<option value="">Select meal type</option>
							<option value="breakfast">Breakfast</option>
							<option value="lunch">Lunch</option>
							<option value="dinner">Dinner</option>
							<option value="snack">Snack</option>
							<option value="dessert">Dessert</option>
							<option value="appetizer">Appetizer</option>
							<option value="side-dish">Side Dish</option>
							<option value="soup">Soup</option>
							<option value="salad">Salad</option>
							<option value="sauce">Sauce</option>
							<option value="drink">Drink</option>
							<option value="smoothie">Smoothie</option>
							<option value="dip">Dip</option>
							<option value="spread">Spread</option>
							<option value="condiment">Condiment</option>
							<option value="marinade">Marinade</option>
							<option value="topping">Topping</option>
							<option value="garnish">Garnish</option>
							<option value="filling">Filling</option>
							<option value="wrap">Wrap</option>
						</select>
					</label>
				</div>
				<label className="text-cyan-300 uppercase text-sm">
					Cooking Time:{" "}
					<span className="text-neutral-500">
						(e.g., '30 mins', '1 hour')
					</span>
					<input
						type="text"
						value={cookingTime}
						onChange={(e) => setCookingTime(e.target.value)}
						required
						className="w-full border-2 border-neutral-700 bg-neutral-900 text-cyan-400 p-2 mt-1 focus:border-pink-500 focus:shadow-[0_0_10px_rgba(236,72,153,0.5)] focus:outline-none transition-all duration-300 ease-in-out font-mono"
					/>
				</label>

				<fieldset className="border-2 border-neutral-700 p-4 group hover:border-pink-500 transition-colors duration-300 ease-in-out">
					<legend className="text-cyan-300 group-hover:text-pink-400 font-bold px-2 uppercase transition-colors duration-300 ease-in-out">
						// Data Block: Cooking Instructions
					</legend>
					{cookingInstructions.map((instruction, index) => (
						<div
							key={index}
							className="flex gap-2 mb-2 items-center">
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
								className="flex-1 border-2 border-neutral-700 bg-neutral-900 text-neutral-300 p-2 focus:border-cyan-400 focus:outline-none transition-colors duration-300 ease-in-out font-mono"
							/>
							<button
								type="button"
								onClick={() =>
									removeArrayField(
										setCookingInstructions,
										cookingInstructions,
										index
									)
								}
								disabled={cookingInstructions.length === 1}
								className="border-2 border-red-700 bg-transparent text-red-400 px-3 py-1 disabled:opacity-50 hover:border-pink-500 hover:text-pink-400 transition-all duration-300 ease-in-out text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
								<span className="hidden sm:inline">Remove</span>
								<span className="inline sm:hidden">Del</span>
							</button>
						</div>
					))}
					<button
						type="button"
						onClick={() =>
							addArrayField(
								setCookingInstructions,
								cookingInstructions
							)
						}
						className="border-2 border-pink-500 bg-transparent text-pink-400 px-4 py-2 mt-2 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 ease-in-out uppercase text-sm font-bold focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50">
						+ Add Instruction Data
					</button>
				</fieldset>

				<fieldset className="border-2 border-neutral-700 p-4 group hover:border-pink-500 transition-colors duration-300 ease-in-out">
					<legend className="text-cyan-300 group-hover:text-pink-400 font-bold px-2 uppercase transition-colors duration-300 ease-in-out">
						// Data Block: Nutrition Info
					</legend>
					<div className="grid grid-cols-2 gap-2">
						<label className="text-cyan-300 uppercase text-sm">
							Calories:
							<input
								type="text"
								value={calories}
								onChange={(e) => setCalories(e.target.value)}
								className="w-full border-2 border-neutral-700 bg-neutral-900 text-cyan-400 p-2 mt-1 focus:border-pink-500 focus:shadow-[0_0_10px_rgba(236,72,153,0.5)] focus:outline-none transition-all duration-300 ease-in-out font-mono"
							/>
						</label>
						<label className="text-cyan-300 uppercase text-sm">
							Protein:
							<input
								type="text"
								value={protein}
								onChange={(e) => setProtein(e.target.value)}
								className="w-full border-2 border-neutral-700 bg-neutral-900 text-cyan-400 p-2 mt-1 focus:border-pink-500 focus:shadow-[0_0_10px_rgba(236,72,153,0.5)] focus:outline-none transition-all duration-300 ease-in-out font-mono"
							/>
						</label>
						<label className="text-cyan-300 uppercase text-sm">
							Fat:
							<input
								type="text"
								value={fat}
								onChange={(e) => setFat(e.target.value)}
								className="w-full border-2 border-neutral-700 bg-neutral-900 text-cyan-400 p-2 mt-1 focus:border-pink-500 focus:shadow-[0_0_10px_rgba(236,72,153,0.5)] focus:outline-none transition-all duration-300 ease-in-out font-mono"
							/>
						</label>
						<label className="text-cyan-300 uppercase text-sm">
							Carbohydrates:
							<input
								type="text"
								value={carbohydrates}
								onChange={(e) =>
									setCarbohydrates(e.target.value)
								}
								className="w-full border-2 border-neutral-700 bg-neutral-900 text-cyan-400 p-2 mt-1 focus:border-pink-500 focus:shadow-[0_0_10px_rgba(236,72,153,0.5)] focus:outline-none transition-all duration-300 ease-in-out font-mono"
							/>
						</label>
						<label className="text-cyan-300 uppercase text-sm">
							Cholesterol:
							<input
								type="text"
								value={cholesterol}
								onChange={(e) => setCholesterol(e.target.value)}
								className="w-full border-2 border-neutral-700 bg-neutral-900 text-cyan-400 p-2 mt-1 focus:border-pink-500 focus:shadow-[0_0_10px_rgba(236,72,153,0.5)] focus:outline-none transition-all duration-300 ease-in-out font-mono"
							/>
						</label>
						<label className="text-cyan-300 uppercase text-sm">
							Sodium:
							<input
								type="text"
								value={sodium}
								onChange={(e) => setSodium(e.target.value)}
								className="w-full border-2 border-neutral-700 bg-neutral-900 text-cyan-400 p-2 mt-1 focus:border-pink-500 focus:shadow-[0_0_10px_rgba(236,72,153,0.5)] focus:outline-none transition-all duration-300 ease-in-out font-mono"
							/>
						</label>
					</div>
				</fieldset>

				<button
					type="submit"
					className="border-2 border-pink-500 bg-transparent text-pink-400 px-4 py-2 mt-2 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 ease-in-out uppercase text-sm font-bold focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50">
					Insert Recipe Data
				</button>
			</form>
		</div>
	);
}
