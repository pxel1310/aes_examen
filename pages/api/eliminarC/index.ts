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

const deleteCipher = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { message, user } = req.body as {
    message: string;
    user: string;
  };
  await db.connect();
  const cipherF = await Cipher.findOne({ message: message, user: user });

  try {
    await cipherF.delete();
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el cifrado" });
  }
  await db.disconnect();
  res.status(200).json({ message: "Cifrado eliminado" });
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return deleteCipher(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}
