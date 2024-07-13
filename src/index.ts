import express, { json, Request, Response, urlencoded } from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./database/connection";
import { FoodModel } from "./modules/foodModel";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 3002;

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(cors());

/* app.use("/api"); */

connectToDatabase();

app.get("/", (req: Request, res: Response) => {
  res.json({ ok: "OK" });
});

app
  .get("/foods", async (req: Request, res: Response) => {
    const allFoods = await FoodModel.find({}).select({ _id: 0 });
    return res.json(allFoods);
  })
  .post("/foods", async (req: Request, res: Response) => {
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
  });

app.get("/reset", async (_, res: Response) => {
  await FoodModel.deleteMany({});
  return res.json({ reset: "reset" });
});

app.listen(3002, "0.0.0.0", () => {
  console.log("App listening on port ", port);
});
