import { Document, Types } from "mongoose";
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

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  avatarURL?: string;

  @Prop()
  realName?: string;

  @Prop({ default: 0 })
  wins: 0;

  @Prop({ default: 0 })
  losses: 0;
}

export const UserSchema = SchemaFactory.createForClass(User);
