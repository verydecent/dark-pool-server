import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    // Array of task references
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
      }
    ]
  },
  { timestamps: true }
);

const Entry = mongoose.model('Entry', entrySchema);

export default Entry;
