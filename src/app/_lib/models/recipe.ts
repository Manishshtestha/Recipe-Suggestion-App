export interface Recipe {
  id: number;
  name: string;
  image: string;
  ingredients: string[];
  dietaryRestrictions: string[];
  cuisine: string;
  cookingMethod: string;
  mealType: string;
  cookingTime: string;
}
