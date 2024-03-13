import * as mongoose from "mongoose";
import { Document } from "mongoose";
//MongoDB allows you to store documents in a collection
//with enforcing uniform structure, but as apps grow
//structure becomes more important. The schema adds
//validation to prevent the risk of storing incomplete
//or incorrect data which can lead to bugs.

export interface User extends Document {
  username: string;
  createdat: Date;
}

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});
