import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../database";
import { Cipher } from "../../../models";

type Data =
  | { message: string }
  | {
      cipher: {
        user: string;
        message: string;
        userCreated: string;
      };
    };

const registerCipher = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { user, message, userCreated } = req.body as {
    user: string;
    message: string;
    userCreated: string;
  };

  await db.connect();
  if (!user || !message || !userCreated) {
    return res.status(400).json({ message: "Faltan datos papu" });
  }

  const newCipher = new Cipher({
    user,
    type: "-> mess only <-",
    cipher: 0,
    message,
    messagein: "-> mess only <-",
    key: "-> mess only <-",
    userCreated,
  });

  try {
    await newCipher.save();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al guardar el cifrado - SERVER" });
  }

  await db.disconnect();
  res.status(200).json({ cipher: newCipher });
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return registerCipher(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}
