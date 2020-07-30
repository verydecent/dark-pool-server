import mongoose from 'mongoose';

const subtaskSchema = new mongoose.Schema({
    description: {
      type: String
    },
    complete: {
      type: Boolean
    },
    task_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    }
  },
  { timestamps: true }
);

const Subtask = mongoose.model('Subtask', subtaskSchema);

export default Subtask;
