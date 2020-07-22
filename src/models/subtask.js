import mongoose from 'mongoose';

const subtaskSchema = new mongoose.Schema(
  {
    description: {
      type: String
    },
    complete: {
      type: Boolean
    }
  }
);

const Subtask = mongoose.model('Subtask', subtaskSchema);

export default Subtask;
