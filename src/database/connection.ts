import mongoose from "mongoose";

export const connectToDatabase = () => {
  if (!process.env.MONGO_URI) {
    console.error("There was a problem with provided MongoDB URI");
    return;
  }
  mongoose.connect(
    "mongodb+srv://aleserrgwe:VSSlQhfgluvv74YgKvUs@cluster0.0szffmv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
};
