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
router.route("/add_to_activity").post(addToHistory);
router.route("/get_all_activity").get(getUserHistory);
router.route("/createMeeting").post(createMeeting);
router.route("/getusername").post(getUserName);

export default router;

import dotenv from "dotenv";
dotenv.config();
