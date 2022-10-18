import { AES, enc } from "crypto-js";

interface Ireturn {
  messageF?: string;
  messagein?: string;
  key: string;
}

export function encrypt(message: string, key: string): Ireturn {
  return {
    messagein: AES.encrypt(message, key).toString(),
    key,
  };
}

export function decrypt(messagein: string, key: string): Ireturn {
  return {
    messageF: AES.decrypt(messagein, key).toString(enc.Utf8),
    key,
  };
}
