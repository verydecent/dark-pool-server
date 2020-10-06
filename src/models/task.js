const mongoose = require('mongoose');
const Subtask = require('./subtask');

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
  },
  subtasks: [Subtask.schema]
},
  { timestamps: true }
);

taskSchema.pre('remove', function (next) {
  this.model('Subtask').deleteMany({ task_id: this._id }, next);
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;