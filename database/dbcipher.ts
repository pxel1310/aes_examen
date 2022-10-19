import { db } from "./";
import { Cipher, User } from "../models";

export const getCipher= async () => {
  await db.connect();
  const cipher = await Cipher.find()
    .select("user cipher message messagein key userCreated -_id")
    .lean();
  await db.disconnect();

  if (!cipher) {
    return null;
  }
  return JSON.parse(JSON.stringify(cipher));
};

export const getAllUsers = async () => {
  await db.connect();
  const users = await User.find().select("name email -_id").lean();
  await db.disconnect();

  if (!users) {
    return null;
  }
  return JSON.parse(JSON.stringify(users));
};
