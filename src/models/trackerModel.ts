import { model, Schema } from "mongoose";
import { DietDay } from "../types";
import { foodSchema } from "./foodModel";

const trackerSchema = new Schema<{ day: string; foods: DietDay }>(
  {
    day: { type: String, required: true },
    foods: [foodSchema],
  },
  { versionKey: false }
);

export const TrackerModel = model("tracker", trackerSchema);
