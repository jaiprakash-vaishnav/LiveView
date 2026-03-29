import "dotenv/config.js";
import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);
app.get("/",(req,res)=>{
  res.send("site is Working");
});

app.use((err, req, res, next)=>{
    res.status(404).json({ message : "Page Not Found"});
});

let DB_URL = process.env.MONGODB_ATLAS;

const start = async () => {
  app.set("mongo_user");
  const connectionDb = await mongoose.connect(DB_URL);

  console.log(`MONGO Connected DB HOST: ${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("LISTENIN ON PORT 8000");
  });
};

start();
