import mongoose, { Schema, model, Model } from "mongoose";
import { ICipher } from "../interfaces";

const cipherSchema = new Schema(
  {
    user: { type: String, required: true },
    type: { type: String, required: true },
    cipher: { type: Number, required: true },
    message: { type: String, required: true },
    messagein: { type: String, required: true },
    key: { type: String, required: true },
    userCreated: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Cipher: Model<ICipher> =
  mongoose.models.Cipher || model("Cipher", cipherSchema);

export default Cipher;
