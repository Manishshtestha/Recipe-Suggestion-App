import { toSentenceCase } from "@/app/_lib/utils";
import Link from "next/link";

interface Recipe {
	_id: string;
	name: string;
	image: string;
	ingredients: string[];
	nutrition: string[];
	dietaryRestrictions: string[];
}

interface RecipeCardProps {
	data: Recipe[];
}

const RecipeCard: React.FC<RecipeCardProps> = ({ data }) => {
	if (!data || data.length === 0) {
		return (
			<div className="text-center text-gray-500">No recipes found</div>
		);
	}

	return (
		<div className="grid grid-cols-2 gap-3 max-h-[80vh] overflow-y-scroll">
			{data.map((recipe) => (
				<Link
					key={recipe._id}
					href={`/recipe/${recipe._id}`}
					className="flex gap-2 items-center border rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
					<img
						src={recipe.image}
						alt={recipe.name}
						loading="lazy"
						className="w-[25vh] h-[25vh] object-cover rounded-md mb-4"
					/>
					<div>
						<h2 className="text-xl font-semibold mb-2">
							{recipe.name}
						</h2>
						{/* <div className="mb-2">
							<strong>Ingredients:</strong>
							<ul className="list-inside list-none flex gap-2 flex-wrap">
								{recipe.ingredients.map((ingredient, index) => (
									<li
										key={index}
										className="border rounded-full text-sm px-2">
										{toSentenceCase(ingredient)}
									</li>
								))}
							</ul>
						</div> */}
						<div className="mb-2">
							{/* <h2 className="text-xl font-semibold mb-2">
								Nutrition
							</h2> */}
							<ul className="list-none flex flex-col gap-0.5 list-inside">
								{recipe.nutrition.map(
									(nutrient: string, index: number) => (
										<li
											key={index}
											className="p-1 text-sm ">
											{nutrient}
										</li>
									)
								)}
							</ul>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default RecipeCard;
