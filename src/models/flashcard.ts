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

export interface FCardGetOneInput {
  _id: string;
  token: string;
}

//interfaces for the flash cards data

const FCardSchema = new Schema<FCard>( //creates the mongoose schema
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

export const FCardMDB = model<FCard>('fcard', FCardSchema); //creates the mongoose document model for the flashcards using the flashcards mongoose schema