import { Schema, model } from "mongoose";
export interface User {
  userName: string;
  email: string;
  password: string;
}

export interface sessionData {
  userId: string;
  token: any;
  tokenExpiration: number;
}

export interface UserLogin {
  email: string;
  password: string;
}

const userSchema = new Schema<User>(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const UserMDB = model<User>('user', userSchema);
