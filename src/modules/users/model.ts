import bcrypt from 'bcrypt';
import { Document, model, Schema } from 'mongoose';

interface User extends Document {
  name: string,
  password: string,
}

const schema = new Schema(
  {
    name: { required: true, type: String, unique: true },
    password: { required: true, type: String },
  },
  { timestamps: true },
);

schema.pre('save', async function (this: User, next: any) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', schema);

export default User;
