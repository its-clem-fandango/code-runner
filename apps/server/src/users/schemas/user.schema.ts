import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
//MongoDB allows you to store documents in a collection
//with enforcing uniform structure, but as apps grow
//structure becomes more important. The schema adds
//validation to prevent the risk of storing incomplete
//or incorrect data which can lead to bugs.

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  avatarURL?: string;

  @Prop()
  realName?: string;

  @Prop({ default: 0 })
  wins: number;

  @Prop({ default: 0 })
  losses: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 }, { unique: true, sparse: true });
