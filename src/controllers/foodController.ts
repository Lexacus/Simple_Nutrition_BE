import { Request, Response } from "express";
import { FoodModel } from "../models/foodModel";

export const getFoods = async (req: Request, res: Response) => {
  const allFoods = await FoodModel.find({}).sort({ name: "asc" });
  return res.json(allFoods);
};

export const addFood = async (req: Request, res: Response) => {
  if (!Object.keys(req.body).length) {
    return res.json({ message: "Empty body" });
  }
  const addedFood = await FoodModel.create(req.body);
  return res.json(addedFood);
};

export const replaceFoods = async (req: Request, res: Response) => {
  if (!Object.keys(req.body).length) {
    return res.json({ message: "Empty body" });
  }
  try {
    // Use a transaction to delete current documents and replace them with the ones from request
    const session = await FoodModel.startSession();
    session.startTransaction();

    try {
      await FoodModel.deleteMany({}, { session });

      await FoodModel.insertMany(req.body, { session });

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error("Error replacing documents:", error);
  }
  return res.json(req.body);
};
