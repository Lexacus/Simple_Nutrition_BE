import { Request, Response } from "express";
import { TrackerModel } from "../models/trackerModel";

export const getTrackedDays = async (req: Request, res: Response) => {
  const allTrackedDays = await TrackerModel.find({}).select({ _id: 0 });
  return res.json(allTrackedDays);
};

export const replaceTrackedDays = async (req: Request, res: Response) => {
  if (!Object.keys(req.body).length) {
    return res.json({ message: "Empty body" });
  }
  try {
    // Use a transaction to delete current documents and replace them with the ones from request
    const session = await TrackerModel.startSession();
    session.startTransaction();

    try {
      await TrackerModel.deleteMany({}, { session });

      await TrackerModel.insertMany(req.body, { session });

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
