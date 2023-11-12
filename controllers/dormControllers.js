import dotenv from "dotenv"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import Dorm from "../models/Dorm.js"
import User from "../models/User.js"

dotenv.config()

export const createDorm = async (req, res) => {
  const { dormName, dormId, dormOwner, dormDescription, dormImage } = req.body;
  const siteId = req.siteId;
  const foundDorm = await Dorm.findOne({ dormId });
  if (foundDorm) {
    return res.status(401).json("Dorm already exists");
  }

  try {
    const newDorm = new Dorm({
      dormName,
      dormId,
      dormTemperature: 0,
      dormHumidity: 0,
      dormMembers: [dormOwner],
      doorLastOpened: new Date(),
      doorOpenedTimes: [],
      dormStatus: "Open",
      dormImage,
      dormDescription,
    });

    const savedDorm = await newDorm.save();

    if (!savedDorm) {
      return res.status(500).json("Failed to save dorm in the database");
    } else {
      const updatedUser = await User.findOneAndUpdate({ siteId }, { dormId });
      if (!updatedUser) {
        return res.status(500).json("Failed to update user with new dorm");
      }
    }

    return res.status(200).json({
      message: "Dorm created successfully",
    });
  } catch (error) {
    return res.status(500).json(`Error in creating dorm: ${error.message}`);
  }
}

export const getDormStatus = async (req, res) => {
  const siteId = req.siteId;
  if (!siteId) {
    return res.status(401).json("Unauthorized");
  }

  const foundUser = await User.findOne({ siteId });

  if (!foundUser) {
    return res.status(401).json("User Not found");
  }

  const dormId = foundUser.dormId;

  const foundDorm = await Dorm.findOne({ dormId });

  if (!foundDorm) {
    return res.status(401).json("Dorm Not found attached to the given user");
  }

  const dormStatus = {
    dormName: foundDorm.dormName,
    dormStatus: foundDorm.dormStatus,
    dormImage: foundDorm.dormImage,
    dormDescription: foundDorm.dormDescription,
    doorLastOpened: foundDorm.doorLastOpened,
    doorOpenedTimes: foundDorm.doorOpenedTimes,
    dormTemperature: foundDorm.dormTemperature,
    dormHumidity: foundDorm.dormHumidity,
  }

  return res.status(200).json(dormStatus);

}

export const updateDescription = async (req, res) => {
  const siteId = req.siteId;
  if (!siteId) {
    return res.status(401).json("Unauthorized");
  }

  const foundUser = await User.findOne({ siteId });

  if (!foundUser) {
    return res.status(401).json("User Not found");
  }

  const dormId = foundUser.dormId;

  const updatedDescription = await Dorm.findOneAndUpdate({ dormId }, { dormDescription: req.body.dormDescription });

  if (!updatedDescription) {
    return res.status(401).json("Failed to update description");
  }

  return res.status(200).json("Description updated successfully");
}