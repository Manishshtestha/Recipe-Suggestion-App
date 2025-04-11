//To create a ingredient selector component (The ingredients will be fetched from database later for now we will hardcode them) that will allow the user to select multiple ingredients and then display the selected ingredients in a list below the selector. The component should be responsive and should work on mobile devices as well. The component should be written in TypeScript and should use Tailwind CSS for styling. The component should be functional and should not use any class components. The component should be reusable and should not depend on any external libraries. The component should be written in a way that it can be easily integrated into any Next.js application. Eventhough using a checkbox the checkbox shouldn't be visible and when checked the background of the seleceted ingredient should change to green and the text should be white. The component should also have a hover effect that changes the background color to a lighter shade of green when hovered over. The component should also have a focus effect that changes the background color to a darker shade of green when focused on. The component should also have an active effect that changes the background color to a darker shade of green when clicked on. The component should also have a disabled state that changes the background color to a grey color when disabled. The component should also have an error state that changes the background color to a red color when there is an error. The component should also have a loading state that shows a loading spinner when loading. The component should also have a success state that shows a success message when successful. The component should also have a warning state that shows a warning message when there is a warning. The component should also have an info state that shows an info message when there is an info. The component should also have a default state that shows the default message when there is no state.
"use client";
import { useState } from "react";

const IngredientsSelector = () => {
	const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
		[]
	);
	const [ingredients] = useState([
		"Tomato",
		"Potato",
		"Onion",
		"Garlic",
		"Ginger",
		"Carrot",
		"Cucumber",
		"Spinach",
		"Broccoli",
		"Cauliflower",
		"Bell Pepper",
		"Mushroom",
		"Eggplant",
		"Zucchini",
		"Pumpkin",
	]);

	const handleIngredientSelect = (ingredient: string) => {
		setSelectedIngredients((prev) =>
			prev.includes(ingredient)
				? prev.filter((i) => i !== ingredient)
				: [...prev, ingredient]
		);
	};
	return (
		<div>
			<h2>Ingredients</h2>
			<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9">
				{ingredients.map((ingredient, index) => (
					<label
						key={index}
						className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer 
							${
								selectedIngredients.includes(ingredient)
									? "bg-[#7cff67] text-black"
									: "text-white hover:bg-green-200 hover:text-black focus:bg-green-300 active:bg-[#7cff67] disabled:bg-gray-300"
							}`}>
						<input
							type="checkbox"
							className="hidden"
							checked={selectedIngredients.includes(ingredient)}
							onChange={() => handleIngredientSelect(ingredient)}
						/>
						<span>{ingredient}</span>
					</label>
				))}
			</div>
		</div>
	);
};

export default IngredientsSelector;
