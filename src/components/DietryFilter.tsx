"use client";
import { useState } from "react";
const DietryFilter = () => {
	const [selectedDietaryPreference, setSelectedDietaryPreference] =
		useState("");
	const [selectedCuisine, setSelectedCuisine] = useState("");
	const [selectedCookingMethod, setSelectedCookingMethod] = useState("");
	const [selectedMealType, setSelectedMealType] = useState("");
	const [selectedCookingTime, setSelectedCookingTime] = useState("");

	return (
		<div>
			<div className="flex flex-wrap justify-center gap-2"></div>
			<select
				className="bg-black border border-gray-300 rounded-full text-center px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				onChange={(e) => setSelectedDietaryPreference(e.target.value)}
				value={selectedDietaryPreference}>
				<option value="">Select dietary preference</option>
				<option value="vegetarian">Vegetarian</option>
				<option value="vegan">Vegan</option>
				<option value="gluten-free">Gluten-free</option>
				<option value="dairy-free">Dairy-free</option>
				<option value="keto">Keto</option>
				<option value="paleo">Paleo</option>
			</select>
			<select
				className="bg-black border border-gray-300 rounded-full text-center px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-4"
				onChange={(e) => setSelectedCuisine(e.target.value)}
				value={selectedCuisine}>
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
				<option value="middle-eastern">Middle Eastern</option>
				<option value="korean">Korean</option>
			</select>
			<select
				className="bg-black border border-gray-300 rounded-full text-center    enter px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-4"
				onChange={(e) => setSelectedCookingMethod(e.target.value)}
				value={selectedCookingMethod}>
				<option value="">Select cooking method</option>
				<option value="baking">Baking</option>
				<option value="grilling">Grilling</option>
				<option value="boiling">Boiling</option>
				<option value="steaming">Steaming</option>
				<option value="frying">Frying</option>
				<option value="roasting">Roasting</option>
			</select>
			<select
				className="bg-black border border-gray-300 rounded-full text-center px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-4"
				onChange={(e) => setSelectedMealType(e.target.value)}
				value={selectedMealType}>
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
			<select
				className="bg-black border border-gray-300 rounded-full text-center px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-4"
				onChange={(e) => setSelectedCookingTime(e.target.value)}
				value={selectedCookingTime}>
				<option value="">Select cooking time</option>
				<option value="under-30-minutes">Under 30 minutes</option>
				<option value="30-60-minutes">30-60 minutes</option>
				<option value="1-2-hours">1-2 hours</option>
				<option value="2-4-hours">2-4 hours</option>
				<option value="4-8-hours">4-8 hours</option>
			</select>
		</div>
	);
};

export default DietryFilter;
