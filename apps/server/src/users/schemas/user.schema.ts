import * as mongoose from "mongoose";

//MongoDB allows you to store documents in a collection
//with enforcing uniform structure, but as apps grow
//structure becomes more important. The schema adds
//validation to prevent the risk of storing incomplete
//or incorrect data which can lead to bugs.

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
