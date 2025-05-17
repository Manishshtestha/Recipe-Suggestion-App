import dbConnect from "@/app/_lib/mongoose";
import RecipeModel from "@/app/_lib/models/recipeModel";
import { toSentenceCase } from "@/app/_lib/utils";
import CommentsSection from "@/components/CommentSection";
import InteractiveSection from "@/components/InteractiveSection";

interface RecipePageProps {
	params: { recipeId: string };
}

// Helper function to render key-value pairs, can be expanded
const DetailItem: React.FC<{
	label: string;
	value: string | string[] | undefined;
}> = ({ label, value }) => {
	if (!value || (Array.isArray(value) && value.length === 0)) return null;
	const displayValue = Array.isArray(value) ? value.join(", ") : value;
	return (
		<div className="mb-3">
			<strong className="text-pink-400 uppercase tracking-wide text-sm">
				{label}:
			</strong>
			<span className="ml-2 text-neutral-400">
				{toSentenceCase(displayValue)}
			</span>
		</div>
	);
};

export default async function UniqueRecipe({ params }: RecipePageProps) {
	await dbConnect();
	const recipe = await RecipeModel.findOne({ _id: params.recipeId }).lean();

	if (!recipe) {
		return (
			<div className="min-h-screen flex items-center justify-center font-mono text-center text-yellow-400 text-2xl p-10 border-2 border-dashed border-yellow-500 bg-neutral-900 rounded-none">
				Recipe data CORRUPTED or not found in archive. Check uplink.
			</div>
		);
	}

	return (
		<div className="flex justify-center overflow-y-hidden">
			<main className=" h-[90vh] mt-10 overflow-y-scroll p-4 md:p-8 font-mono text-neutral-300">
				<div className="recipe-container bg-opacity-70 backdrop-blur-sm border-2 border-neutral-700 p-6 md:p-8 max-w-5xl mx-auto rounded-none shadow-lg shadow-cyan-500/20">
					<div className="recipe-header mt-6 mb-8 text-center">
						<h1 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400 uppercase tracking-wider break-words">
							{recipe.name}
						</h1>
						{recipe.image && (
							<div className="recipe-image mb-6 flex justify-center">
								<img
									src={recipe.image}
									alt={`Visual data for: ${recipe.name}`}
									className="rounded-none border-2 border-neutral-600 shadow-md shadow-pink-500/20 max-h-[300px] md:max-h-[400px] object-contain"
								/>
							</div>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
						<section className="mb-6">
							<h2 className="text-xl md:text-2xl font-semibold mb-3 text-pink-400 uppercase tracking-wider">
								// Components_List
							</h2>
							{recipe.ingredients &&
							recipe.ingredients.length > 0 ? (
								<ul className="list-none flex flex-wrap gap-2">
									{recipe.ingredients.map(
										(ingredient: string, index: number) => (
											<li
												key={index}
												className="bg-neutral-800 border border-neutral-700 text-cyan-300 rounded-none px-3 py-1 text-sm hover:bg-neutral-700 hover:border-cyan-400 transition-all duration-150">
												{toSentenceCase(ingredient)}
											</li>
										)
									)}
								</ul>
							) : (
								<p className="text-neutral-500 italic">
									No component data available.
								</p>
							)}
						</section>

						<section className="mb-6">
							<h2 className="text-xl md:text-2xl font-semibold mb-3 text-pink-400 uppercase tracking-wider">
								// Nutritional_Profile
							</h2>
							{recipe.nutrition && recipe.nutrition.length > 0 ? (
								<ul className="list-none space-y-1">
									{recipe.nutrition.map(
										(nutrient: string, index: number) => (
											<li
												key={index}
												className="text-green-400 text-sm">
												<span className="text-pink-500 mr-1">{`>`}</span>
												{nutrient}
											</li>
										)
									)}
								</ul>
							) : (
								<p className="text-neutral-500 italic">
									No nutritional data logged.
								</p>
							)}
						</section>

						{recipe.dietaryRestrictions &&
							recipe.dietaryRestrictions.length > 0 && (
								<section className="mb-6 md:col-span-2">
									<h2 className="text-xl md:text-2xl font-semibold mb-3 text-pink-400 uppercase tracking-wider">
										// Dietary_Flags
									</h2>
									<ul className="list-none flex flex-wrap gap-2">
										{recipe.dietaryRestrictions.map(
											(
												restriction: string,
												index: number
											) => (
												<li
													key={index}
													className="bg-yellow-600 bg-opacity-30 border border-yellow-500 text-yellow-300 rounded-none px-3 py-1 text-sm">
													{toSentenceCase(
														restriction
													)}
												</li>
											)
										)}
									</ul>
								</section>
							)}
					</div>

					<section className="my-8 border-t-2 border-neutral-700 pt-6">
						<h2 className="text-xl md:text-2xl font-semibold mb-4 text-pink-400 uppercase tracking-wider">
							// System_Parameters
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
							<DetailItem
								label="Cuisine Type"
								value={recipe.cuisine}
							/>
							<DetailItem
								label="Fabrication Method"
								value={recipe.cookingMethod}
							/>
							<DetailItem
								label="Optimal Consumption Window"
								value={recipe.mealType}
							/>
							<DetailItem
								label="Est. Fabrication Time"
								value={recipe.cookingTime}
							/>
						</div>
					</section>

					{recipe.cookingInstructions &&
						recipe.cookingInstructions.length > 0 && (
							<section className="mb-6">
								<h2 className="text-xl md:text-2xl font-semibold mb-4 text-pink-400 uppercase tracking-wider">
									// Fabrication_Protocol
								</h2>
								<ol className="list-none space-y-3">
									{recipe.cookingInstructions.map(
										(step: string, index: number) => (
											<li
												key={index}
												className="text-neutral-300 leading-relaxed flex">
												<span className="text-cyan-400 font-bold mr-3 select-none">{`${
													index + 1
												}. `}</span>
												<span>{step}</span>
											</li>
										)
									)}
								</ol>
							</section>
						)}
				</div>
			</main>
			<div>
				<InteractiveSection initialLiked={false} recipeId={params.recipeId} totalLikes={2}/>
			</div>
		</div>
	);
}
