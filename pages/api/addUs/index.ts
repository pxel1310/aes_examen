import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../database";
import { Cipher } from "../../../models";

type Find = {
  user: string;
  type: string;
  cipher: number;
  message: string;
  messagein: string;
  key: string;
  userCreated: string;
};

const addUsu = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  let { newuserf, messagef, userf } = req.body as {
    newuserf: string;
    messagef: string;
    userf: string;
  };

  await db.connect();


  const cipherF: Find = await Cipher.findOne({
    message: messagef,
    user: userf,
  });

  let obj: Find = {
    user: newuserf,
    type: cipherF.type,
    cipher: cipherF.cipher,
    message: cipherF.message,
    messagein: cipherF.messagein,
    key: cipherF.key,
    userCreated: cipherF.userCreated,
  };

  const cipher = new Cipher(obj);

  try {
    await cipher.save();
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
