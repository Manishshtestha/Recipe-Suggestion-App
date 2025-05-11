import mongoose,{ Model, Schema, Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
}

const UserSchema: Schema<IUser> = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

const UserModel: Model<IUser> =
    mongoose.models.Recipe || mongoose.model<IUser>("User", UserSchema);

export default UserModel;