import { Router } from "express";
import {
  addToHistory,
  getUserHistory,
  login,
  register,
  createMeeting,
  getUserName
} from "../controllers/user.controller.js";

const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/activity").get(getUserHistory).post(addToHistory);
router.route("/meeting").post(createMeeting);
router.route("/user").post(getUserName);

export default router;

import dotenv from "dotenv";
dotenv.config();
