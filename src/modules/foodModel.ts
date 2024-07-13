import { model, Schema } from "mongoose";
import { Food } from "../types";

const foodSchema = new Schema<Food>(
  {
    calories: { type: Number },
    carbohydrates: { type: Number },
    fats: { type: Number },
    grams: { type: Number },
    meal: { type: String },
    proteins: { type: Number },
    name: { type: String },
  },
  { versionKey: false }
);

/* const foodSchema = new Schema<{ foods: Food[] }>({
  foods: [
    {
      calories: { type: Number },
      carbohydrates: { type: Number },
      fats: { type: Number },
      grams: { type: Number },
      meal: { type: String },
      proteins: { type: Number },
      name: { type: String },
    },
  ],
}); */

export const FoodModel = model("food", foodSchema);
