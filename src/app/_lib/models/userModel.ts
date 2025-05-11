import mongoose,{ Model, Schema, Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
    following: string[];
    followers: string[];
}

const UserSchema: Schema<IUser> = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
    following:{type:[String],},
    followers:{type:[String],},
});

const UserModel: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;