interface Recipe {
	id: number;
	name: string;
	image: string;
	ingredients: string[];
	dietaryRestrictions: string[];
}

interface RecipeCardProps {
	data: Recipe[];
}

const SuggestedRecipe: React.FC<RecipeCardProps> = ({ data }) => {
	if (!data || data.length === 0) {
		return (
			<div className="text-center text-gray-500">No recipes found</div>
		);
	}

	return (
		<div className="grid grid-cols-4 gap-3 ">
			{data.map((recipe) => (
				<div
					key={recipe.id}
					className="border rounded-xl p-4 shadow-md">
					<img
						src={recipe.image}
						alt={recipe.name}
						className="w-full h-48 object-cover rounded-md mb-4"
					/>
					<h2 className="text-xl font-semibold mb-2">
						{recipe.name}
					</h2>
					<div className="mb-2">
						<strong>Ingredients:</strong>
						<ul className="list-disc list-inside">
							{recipe.ingredients.map((ingredient, index) => (
								<li key={index}>{ingredient}</li>
							))}
						</ul>
					</div>
					<div>
						<strong>Dietary Restrictions:</strong>
						<ul className="list-disc list-inside">
							{recipe.dietaryRestrictions.map(
								(restriction, index) => (
									<li key={index}>{restriction}</li>
								)
							)}
						</ul>
					</div>
				</div>
			))}
		</div>
	);
};

export default SuggestedRecipe;
