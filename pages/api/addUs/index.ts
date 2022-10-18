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

const addUsu = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  let { newuserf, messagef, userf } = req.body as {
    newuserf: string;
    messagef: string;
    userf: string;
  };

  await db.connect();

  // Crear un nuevo cifrado con los datos del usuario

  let cipher = await Cipher.findOne({ user: userf, message: messagef });

  let newCipher = new Cipher({
    ...cipher,
  });

  try {
    newCipher.user = newuserf;
    await newCipher.save();
    return res.status(200).json({ message: "Cifrado actualizado" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al guardar el cifrado - SERVER" });
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "POST":
      return addUsu(req, res);

    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}
