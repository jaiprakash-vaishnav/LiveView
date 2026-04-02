import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import crypto from "crypto";
import { Meeting } from "../models/meeting.model.js";
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password || username.length < 6 || password.length < 6) {
    return res.status(400).json({ message: "Please Provide Valid Input" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User Not Found" });
    }

    let isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      let token = crypto.randomBytes(20).toString("hex");

      user.token = token;
      await user.save();
      return res.status(httpStatus.OK).json({ token: token });
    } else {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid Username or password" });
    }
  } catch (e) {
    return res.status(500).json({ message: `Something went wrong ${e}` });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;
  if (!username || !password || username.length < 6 || password.length < 6) {
    return res.status(400).json({ message: "Please Provide Valid Input" });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(httpStatus.CREATED).json({ message: "User Registered" });
  } catch (e) {
    res.json({ message: `Something went wrong ${e}` });
  }
};

const getUserHistory = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ token: token });
    const meetings = await Meeting.find({ user_id: user.username });
    res.json(meetings);
  } catch (e) {
    res.json({ message: `Something went wrong ${e}` });
  }
};

const addToHistory = async (req, res) => {
  const { token, meetingCode } = req.body;
  if (!token || !meetingCode) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: "Meeting not found" });
  }
  try {
    const user = await User.findOne({ token: token });
    const isMeeting = await Meeting.findOne({ meetingCode: meetingCode });
    if (!isMeeting)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Meeting not found" });
    const meeting = new Meeting({
      user_id: user.username,
      meetingCode: meetingCode,
    });

    await meeting.save();

    res.status(httpStatus.CREATED).json({ message: "Added code to history" });
  } catch (e) {
    res.status(404).json({ message: `Something went wrong ${e}` });
  }
};

const createMeeting = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({ token: token });
    const meetingCode = uuidv4().substring(0, 8);
    const newMeeting = new Meeting({
      user_id: user.username,
      meetingCode: meetingCode,
    });

    await newMeeting.save();
    res.status(httpStatus.CREATED).json({ meetingCode: meetingCode });
  } catch (error) {
    res
      .status(httpStatus.NOT_FOUND)
      .json({ message: `Something went wrong ${e}` });
  }
};

const getUserName = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({ token: token });
    console.log(user.username);
    res.status(httpStatus.OK).json({ username: user.username });
  } catch (error) {
    res
      .status(httpStatus.NOT_FOUND)
      .json({ message: `Something went wrong ${e}` });
  }
};

export {
  login,
  register,
  getUserHistory,
  addToHistory,
  createMeeting,
  getUserName,
};
