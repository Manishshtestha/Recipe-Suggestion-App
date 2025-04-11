"use client";
import { useState, useMemo } from "react";
import { toTitleCase } from "../../utils";
import ingredientGroupsData from "../../data/ingredientGroups";

interface IngredientGroup {
	group_name: string;
	icon: string;
	ingredients: string[];
}

const IngredientsSelector = () => {
	const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
		[]
	);
	const [searchTerm, setSearchTerm] = useState("");
	const [ingredientGroups] =
		useState<IngredientGroup[]>(ingredientGroupsData);

	const handleIngredientSelect = (ingredient: string) => {
		setSelectedIngredients((prev) =>
			prev.includes(ingredient)
				? prev.filter((i) => i !== ingredient)
				: [...prev, ingredient]
		);
	};

	const filteredGroups = useMemo(() => {
		return ingredientGroups
			.map((group) => ({
				...group,
				ingredients: group.ingredients.filter((ingredient) =>
					ingredient.toLowerCase().includes(searchTerm.toLowerCase())
				),
			}))
			.filter((group) => group.ingredients.length > 0);
	}, [ingredientGroups, searchTerm]);

	return (
		<div className="w-full border rounded-2xl p-4">
			<div>
				<h2 className="text-2xl font-bold mb-4">Ingredients</h2>
				<div className="">
					<input
						type="text"
						placeholder="Search ingredients..."
						className="w-full p-2 pl-3 border rounded-full relative focus:outline-none"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					{searchTerm && (
						<button
							className="rounded-full border px-4 py-2 z-20 absolute right-[97px] active:bg-red-600 active:text-black font-bold"
							onClick={() => setSearchTerm("")}>
							X
						</button>
					)}
				</div>
				<div className="flex flex-wrap">
					{selectedIngredients.map((ingredient, index) => (
						<span
							key={index}
							className="bg-white text-black px-2 py-1 rounded-full text-sm mr-2 mt-1"
							onClick={() => handleIngredientSelect(ingredient)}>
							{toTitleCase(ingredient)}
						</span>
					))}
					{selectedIngredients.length === 0 && (
						<span className="text-gray-500 text-sm items-center mt-2">
							No ingredients selected
						</span>
					)}
					{selectedIngredients.length > 0 && (
						<button className="rounded-full border px-2 mt-1 active:bg-red-600 active:text-black " onClick={() => setSelectedIngredients([])}>
							Clear Selection
						</button>
					)}
				</div>
			</div>
			<div className="w-full h-[40vh] overflow-y-auto p-2 rounded-lg shadow-lg">
				{filteredGroups.map(
					(group: IngredientGroup, groupIndex: number) => (
						<div key={groupIndex} className="mb-3">
							<h3 className="text-xl font-semibold mb-1 flex items-center">
								{toTitleCase(group.group_name)}
							</h3>
							<div className="flex flex-wrap gap-2">
								{group.ingredients.map(
									(ingredient: string, index: number) => (
										<label
											key={`${groupIndex}-${index}`}
											className={`flex items-center justify-center px-2 py-1 border rounded-full cursor-pointer 
                  ${
						selectedIngredients.includes(ingredient)
							? "bg-[#7cff67] text-black"
							: "text-white hover:bg-green-200 hover:text-black focus:bg-green-300 active:bg-[#7cff67] disabled:bg-gray-300 transition-all"
					}`}>
											<input
												type="checkbox"
												className="hidden"
												checked={selectedIngredients.includes(
													ingredient
												)}
												onChange={() =>
													handleIngredientSelect(
														ingredient
													)
												}
											/>
											<span className="text-sm">
												{toTitleCase(ingredient)}
											</span>
										</label>
									)
								)}
							</div>
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default IngredientsSelector;
