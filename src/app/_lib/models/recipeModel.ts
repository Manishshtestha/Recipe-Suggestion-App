import mongoose, { Schema, Document, Model,Types } from "mongoose";

export interface IRecipe extends Document {
	name: string;
	image: string;
	ingredients: string[];
	dietaryRestrictions: string[];
	cuisine: string;
	cookingMethod: string;
	mealType: string;
	cookingTime: string;
	cookingInstructions: string[];
    nutrition: string[];
	likes: Types.ObjectId[];
}

const RecipeSchema: Schema<IRecipe> = new Schema({
	name: { type: String, required: true },
	image: { type: String, required: true },
	ingredients: { type: [String], required: true },
	dietaryRestrictions: { type: [String], required: true },
	cuisine: { type: String, required: true },
	cookingMethod: { type: String, required: true },
	mealType: { type: String, required: true },
	cookingTime: { type: String, required: true },
	cookingInstructions: { type: [String], required: true }, //Include in Steps
	nutrition: { type: [String], required: true }, //Include in Nutrition
	likes: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
});

const RecipeModel: Model<IRecipe> =
	mongoose.models.Recipe || mongoose.model<IRecipe>("Recipe", RecipeSchema);

export default RecipeModel;
