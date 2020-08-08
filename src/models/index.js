import mongoose from 'mongoose';

import User from './user';
import Task from './task';
import Subtask from './subtask';


const connectDb = () => {
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    findAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
};

const models = {
  User,
  Task,
  Subtask
};

export { connectDb };

export default models;
