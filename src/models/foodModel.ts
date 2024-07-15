import { model, Schema } from "mongoose";
import { Food } from "../types";

export const foodSchema = new Schema<Food>(
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

export const FoodModel = model("food", foodSchema);
