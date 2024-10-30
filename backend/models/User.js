import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import {v4 as uuid4} from 'uuid'

const userSchema = new mongoose.Schema(
  {
    us_id: {
      type: String,
      unique: true, 
      default: uuid4
    },
    us_name: {
      type: String,
      required: true,
    },
    us_password: {
      type: String,
      required: true,
    },
    us_email: {
      type: String,
      required: true,
      unique: true,
    },
    us_phone_number: {
      type: String,
    },
    us_address: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('us_password')) return next();
  this.us_password = await bcrypt.hash(this.us_password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.us_password);
};

export default mongoose.model("User", userSchema);
