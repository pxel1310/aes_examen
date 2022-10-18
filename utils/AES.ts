import { AES, enc } from "crypto-js"

interface Ireturn {
  messageF?: string
  messageinF?: string
}

export function encrypt(message: string, key: string): Ireturn {
  return {
    messageF: AES.encrypt(message, key).toString(),
  }
}

export function decrypt(messagein: string, key: string): Ireturn {
  return {
    messageinF: AES.decrypt(messagein, key).toString(enc.Utf8),
  }
}
