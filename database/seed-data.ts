import bcrypt from "bcryptjs";

interface SeedUser {
  name: string;
  email: string;
  password: string;
}

interface SeedCipher {
  user: string;
  type: string;
  cipher: number;
  message: string;
  messagein: string;
  key: string;
  userCreated: string;
}

interface SeedData {
  users: SeedUser[];
  ciphers: SeedCipher[];
}

export const initialData: SeedData = {
  users: [
    {
      name: "Ian Ayala",
      email: "ayala.gonzalez.ian@gmail.com",
      password: bcrypt.hashSync("99310675"),
    },
  ],
  ciphers: [
    {
      user: "Ian Ayala",
      type: "message",
      cipher: 128,
      message: "Hello World",
      messagein: '"U2FsdGVkX19iMs8lIuPv6BYGx4jA+stVGefKRjP8BCc="',
      key: "12345678",
      userCreated: "Ian Ayala",
    },
    {
      user: "Example User",
      type: "message",
      cipher: 256,
      message: "Hello World",
      messagein: '"U2FsdGVkX19iMs8lIuPv6BYGx4jA+stVGefKRjP8BCc="',
      key: "12345678123456781234567812345678",
      userCreated: "Example User",
    },
    {
      user: "Example User",
      type: "file",
      cipher: 192,
      message: "Esto es un archivo",
      messagein: '"U2FsdGVkX19iMs8lIuPv6BYGx4jA+stVGefKRjP8BCc="',
      key: "1234567812345678",
      userCreated: "Example User",
    }
  ],
};
