export default async function UniqueRecipe({
	params,
}: {
	params: { recipeId: string };
}) {
	const recipeId = (await params).recipeId;
	return (
		<div className="recipe-container">
			<div className="recipe-header">
				<h1>Recipe {recipeId}</h1>
				{/* <div className="recipe-image">
					<img
						src={`https://example.com/recipe/${recipeId}.jpg`}
						alt={`Recipe ${recipeId}`}
						className="rounded-lg shadow-md"
					/>
				</div> */}
            
			</div>
		</div>
	);
}
