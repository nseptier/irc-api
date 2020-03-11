import { Document, model, Schema } from 'mongoose';

export interface UserInterface extends Document {
  name: string,
}

const UserSchema = new Schema(
  {
    name: { required: true, type: String, unique: true },
  },
  { timestamps: true },
);

const User = model<UserInterface>('User', UserSchema);

export default User;
