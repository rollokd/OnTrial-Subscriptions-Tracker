import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import subscriptionRouter from "./router";

import "./scheduledTasks/subscriptionChecker";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/", subscriptionRouter);

const dbConnection: string = "mongodb://localhost:27017/Subscriptions";

//MongoDB connection
mongoose
  .connect(dbConnection)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const port: number = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
