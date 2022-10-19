import { AES, enc } from "crypto-js";
import Swal from "sweetalert2";

interface Ireturn {
  messageI?: string;
  messageF?: string;
  messageinF?: string;
}

export function encrypt(message: string, key: string): Ireturn {
  return {
    messageI: message,
    messageF: AES.encrypt(message, key).toString(),
  };
}

export function decrypt(messagein: string, key: string): Ireturn {
  const messageinF = AES.decrypt(messagein, key).toString(enc.Utf8);

  return {
    messageinF,
  };
}

export const alertSuccess = (
  message: string,
  messagein: string,
  key: string
) => {
  Swal.fire(
    "Realizado!",
    `Tu mensaje es: ${message}\n, con llave: ${key}\n, su mensaje cifrado es: ${messagein}\n`,
    "success"
  );
};
