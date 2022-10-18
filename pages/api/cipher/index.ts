import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../database";
import { Cipher } from "../../../models";

type Data =
  | { message: string }
  | {
      cipher: {
        user: string;
        type: string;
        cipher: number;
        message: string;
        messagein: string;
        key: string;
      };
    };

const registerCipher = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { user, type, cipher, message, messagein, key } = req.body as {
    user: string;
    type: string;
    cipher: number;
    message: string;
    messagein: string;
    key: string;
  };
  await db.connect();
  if (!user || !type || !cipher || !message || !messagein || !key) {
    return res.status(400).json({ message: "Faltan datos papu" });
  }

  if (cipher / 8 != key.length) {
    return res
      .status(400)
      .json({ message: "La llave no es valida por el cifrado" });
  }

  const newCipher = new Cipher({
    user,
    type,
    cipher,
    message,
    messagein,
    key,
    userCreated: user,
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
