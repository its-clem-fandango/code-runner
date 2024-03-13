import mongoose from "mongoose";
import { Document, ObjectId } from "mongoose";

export interface Session extends Document {
  userId: ObjectId;
  createdAt: Date;
  expiresAt: Date;
}

export const SessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});
