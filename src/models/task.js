import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},
  { timestamps: true }
);

taskSchema.pre('remove', function (next) {
  this.model('Subtask').deleteMany({ task_id: this._id }, next);
});

const Task = mongoose.model('Task', taskSchema);

export default Task;