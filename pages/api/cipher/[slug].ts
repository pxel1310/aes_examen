import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../database";
import { Cipher } from "../../../models";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "GET":
      return getProductBySlug(req, res);

    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}

async function getProductBySlug(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await db.connect();
  const { slug } = req.query;
  const cipher = await Cipher.find({ user: slug })
    .select("cipher message messagein key userCreated -_id")
    .lean();
  await db.disconnect();

  return res.status(200).json(cipher);
}
