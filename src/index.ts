import express, { json, Request, Response, urlencoded } from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./database/connection";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

/* app.use("/api"); */

connectToDatabase();

app.get("/", (req: Request, res: Response) => {
  res.json({ ok: "OK" });
});

app.listen(port, () => {
  console.log("App listening on port ", port);
});
