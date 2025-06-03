import { toSentenceCase } from "@/app/_lib/utils";
import Link from "next/link";

interface Recipe {
	_id: string;
	name: string;
	image: string;
	ingredients: string[];
	nutrition: string[];
	mealType: string[];
	dietaryRestrictions: string[];
}

interface RecipeCardProps {
	data: Recipe[];
	selectedIngredients: string[];
}

const RecipeCard: React.FC<RecipeCardProps> = ({
	data,
	selectedIngredients,
}) => {
	if (!data || data.length === 0) {
		return (
			<div className="text-center text-yellow-400 text-xl p-10 border-2 border-dashed border-yellow-500 bg-neutral-900 rounded-none">
				No recipes found. Glitch in the matrix?
			</div>
		);
	}

	// Convert selected ingredients to lowercase and trimmed for comparison
	const selectedIngredientsLowerTrimmed = selectedIngredients.map(
		(ingredient) => ingredient.trim().toLowerCase()
	);

	return (
		<div
			className={`grid grid-cols-2 gap-3 max-h-[80vh] overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-neutral-800`}>
			{data.map((recipe) => {
				// Calculate missing ingredients with safeguard
				const missingIngredientsCount = Array.isArray(
					recipe.ingredients
				)
					? recipe.ingredients.filter(
							(ingredient) =>
								!selectedIngredientsLowerTrimmed.includes(
									ingredient.trim().toLowerCase()
								)
					  ).length
					: 0;

				return (
					<Link
						key={recipe._id}
						href={`/recipe/${recipe._id}`}
						className={`group flex flex-col items-center sm:flex-row gap-4 border-2 border-neutral-700 bg-[rgba(0,0,0,0.6)] p-4 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.5),0_0_5px_rgba(0,255,255,0.8)_inset] transition-all duration-300 ease-in-out backdrop-blur-sm rounded-none`}
						title={`Accessing data for: ${recipe.name} // Protocol: ${recipe.mealType}`}>
						<img
							src={recipe.image}
							alt={`Booting image for ${recipe.name}`}
							loading="lazy"
							className="w-[200px] h-[200px] object-cover border-2 border-neutral-600 group-hover:border-pink-500 transition-all duration-300 ease-in-out"
						/>
						<div className="flex-grow">
							<h2 className="text-lg md:text-xl font-bold text-pink-400 group-hover:text-pink-300 mb-2 uppercase tracking-wider break-words">
								{recipe.name}
							</h2>
							{/* Visual feedback for missing ingredients */}
							{selectedIngredients.length > 0 &&
								missingIngredientsCount > 0 && (
									<span className="text-xs text-yellow-400 mb-2 inline-block">
										{missingIngredientsCount} ingredient(s)
										missing
									</span>
								)}
							<div className="mb-2">
								<strong className="text-cyan-300 text-sm">
									Intel Log // Ingredients:
								</strong>
								<ul className="list-inside list-none flex gap-1 flex-wrap mt-1">
									{recipe.ingredients
										.slice(0, 4)
										.map((ingredient, index) => (
											<li
												key={index}
												className="border border-neutral-600 rounded-full text-xs px-2 py-0.5 text-neutral-400 group-hover:text-green-400 group-hover:border-green-600 transition-all">
												{toSentenceCase(ingredient)}
											</li>
										))}
									{recipe.ingredients.length > 4 && (
										<li className="text-xs text-neutral-500">
											...more
										</li>
									)}
								</ul>
							</div>
							<div className="mb-2">
								<ul className="list-none flex flex-col gap-0 list-inside">
									{recipe.nutrition.map(
										(nutrient: string, index: number) => (
											<li
												key={index}
												className="py-0 px-1 text-xs md:text-sm text-green-400 group-hover:text-green-300 font-mono break-words">
												{`> ${nutrient}`}
											</li>
										)
									)}
								</ul>
							</div>
						</div>
					</Link>
				);
			})}
		</div>
	);
};

export default RecipeCard;
