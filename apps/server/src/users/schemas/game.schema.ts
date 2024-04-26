import mongoose from "mongoose";
import { Document } from "mongoose";

export interface Game extends Document {
  challengeId: number;
  players?: string[];
  winner?: string;
}

export const GameSchema = new mongoose.Schema({
  challenegId: { type: Number, required: true },
  players: [String],
  winner: { type: String },
});
