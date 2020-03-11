import bcrypt from 'bcrypt';
import { Document, model, Schema } from 'mongoose';

export interface UserInterface extends Document {
  name: string,
  password: string,
}

const UserSchema = new Schema(
  {
    name: { required: true, type: String, unique: true },
    password: { required: true, type: String },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (this: UserInterface, next: any) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

const User = model<UserInterface>('User', UserSchema);

export default User;
