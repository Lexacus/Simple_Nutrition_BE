import mongoose from "mongoose";

export const connectToDatabase = () => {
  if (!process.env.MONGO_URI) {
    console.error("There was a problem with provided MongoDB URI");
    return;
  }
  mongoose.connect(process.env.MONGO_URI);
};
