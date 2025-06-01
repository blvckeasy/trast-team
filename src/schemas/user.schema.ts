import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    _id: Types.ObjectId;

    @Prop({ required: true })
    first_name: string;

    @Prop({ required: true })
    last_name: string;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false })
    profile_image?: string;

    created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
