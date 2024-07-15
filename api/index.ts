import cors from "cors";
import dotenv from "dotenv";
import express, { json, Request, Response, urlencoded } from "express";
import { connectToDatabase } from "../src/database/connection";
import routes from "../src/routes/routes";

dotenv.config();
const app = express();
const port = process.env.PORT || 3002;

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(cors());

connectToDatabase();

app.get("/", (req: Request, res: Response) => {
  res.json({
    ok: !!process.env.MONGO_URI ? "OK" : "NOT OK",
  });
});

app.use(routes);

app.listen(3002, "0.0.0.0", () => {
  console.log("App listening on port ", port);
});

module.exports = app;
