import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../database";
import { User } from "../../../models";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "GET":
      return allUsers(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const allUsers = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  await db.connect();
  const users = await User.find().select("name email -_id").lean();
  await db.disconnect();

  return res.status(200).json(users);
};
