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
    nutrition: (string | { name: string; value: string })[];
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
	nutrition: { 
		type: Schema.Types.Mixed, 
		required: true,
		default: []
	}, //Use Mixed type for the entire field
	likes: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
});

// Pre-save middleware to ensure nutrition data is properly formatted
RecipeSchema.pre('save', function(next) {
	if (this.nutrition && Array.isArray(this.nutrition)) {
		// Ensure each nutrition item is properly formatted
		this.nutrition = this.nutrition.map(item => {
			if (typeof item === 'string') {
				return item;
			} else if (item && typeof item === 'object' && item.name && item.value) {
				return { name: item.name, value: item.value };
			} else {
				// Fallback: convert to string
				return String(item);
			}
		});
	}
	next();
});

const RecipeModel: Model<IRecipe> =
	mongoose.models.RecipeV2 || mongoose.model<IRecipe>("RecipeV2", RecipeSchema);

export default RecipeModel;
