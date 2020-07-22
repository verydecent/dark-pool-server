import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    description: {
      type: String
    },
    subtasks: [
      {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
      }
    ]
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
