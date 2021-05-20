import { Schema, model } from "mongoose";

export interface User {
  userName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    flashCard: { type: Array, required: false }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const UserMDB = model<User>('user', userSchema);



