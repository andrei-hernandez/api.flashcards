import { Schema, model } from "mongoose";

export interface FCard {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string
  updatedAt: string;
}

export interface FCardInput {
  title: string;
  content: string;
  token: string;
}

export interface FCardUpdateInput {
  _id: string;
  token: string;
  title: string;
  content: string;
}

const FCardSchema = new Schema<FCard>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const FCardMDB = model<FCard>('fcard', FCardSchema);