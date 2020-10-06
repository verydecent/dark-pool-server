const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  complete: {
    type: Boolean
  },
  description: {
    type: String
  }
},
  { timestamps: true }
);

const Subtask = mongoose.model('Subtask', subtaskSchema);

module.exports = Subtask;