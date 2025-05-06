import dbConnect from "@/app/_lib/mongoose";
import RecipeModel from "@/app/_lib/models/recipeModel";

interface RecipePageProps {
  params: { recipeId: string };
}

export default async function UniqueRecipe({ params }: RecipePageProps) {
  await dbConnect();
  const recipe = await RecipeModel.findOne({ _id: await params.recipeId }).lean();

  if (!recipe) {
    return <div className="text-center text-red-500">Recipe not found</div>;
  }

  return (
    <div className="recipe-container p-6 max-w-4xl mx-auto">
      <div className="recipe-header mb-6">
        <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
        <div className="recipe-image mb-4">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="rounded-lg shadow-md max-h-96 object-cover"
          />
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((ingredient: string, index: number) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Dietary Restrictions</h2>
        <ul className="list-disc list-inside">
          {recipe.dietaryRestrictions.map((restriction: string, index: number) => (
            <li key={index}>{restriction}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <strong>Cuisine:</strong> {recipe.cuisine}
      </div>
      <div className="mb-4">
        <strong>Cooking Method:</strong> {recipe.cookingMethod}
      </div>
      <div className="mb-4">
        <strong>Meal Type:</strong> {recipe.mealType}
      </div>
      <div className="mb-4">
        <strong>Cooking Time:</strong> {recipe.cookingTime}
      </div>
      {/* <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Cooking Instructions</h2>
        <ol className="list-decimal list-inside">
          {recipe.cookingInstructions.map((step: string, index: number) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div> */}
      {/* <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Nutrition</h2>
        <ul className="list-disc list-inside">
          {recipe.nurition.map((nutrient: string, index: number) => (
            <li key={index}>{nutrient}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
