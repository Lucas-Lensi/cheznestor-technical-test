import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: 'Firstname must be specified',
    },
    lastname: {
      type: String,
      required: 'Lastname must be specified',
    },
    email: {
      type: String,
      required: 'Email must be specified',
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email',
      ],
    },
    password: {
      type: String,
      required: 'Password must be specified',
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

export default mongoose.model('User', UserSchema);
