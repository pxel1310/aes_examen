export interface ICipher {
  _id: string;

  user: string;
  type: string;
  cipher: number;
  message: string;
  messagein: string;
  key: string;
  userCreated: string;


  createdAt?: string;
  updatedAt?: string;
}
