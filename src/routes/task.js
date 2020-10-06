const express = require('express');
const {
  createTask,
  updateTask,
  deleteTask,
  readTask,
  readByDay,
  readByWeek,
  readByMonth,
  readByYear
} = require('../controllers/task');
const {
  createSubtask,
  updateSubtask,
  deleteSubtask,
} = require('../controllers/subtask');

const router = express.Router()

// *** Task Routes ***

// Get
router.get('/:user_id', readTask);

// Post
router.post('/:user_id', createTask);

// Put/Patch
router.put('/:task_id', updateTask);


// Delete
router.delete('/:task_id', deleteTask);




// *** Subtask Routes ***

// Post
router.post('/:task_id/subtask', createSubtask);

// Put/Patch
router.put('/:task_id/subtask/:subtask_id', updateSubtask);

// Delete
router.delete('/:task_id/subtask/:subtask_id', deleteSubtask);

module.exports = router;