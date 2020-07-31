import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      max: 32,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      minlength: 5,
      required: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
