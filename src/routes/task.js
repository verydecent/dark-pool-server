import { Router } from 'express';
import {
  createTask,
  updateTask,
  deleteTask,
  readTask
} from '../controllers/task';
import {
  createSubtask,
  updateSubtask,
  deleteSubtask,
} from '../controllers/subtask';

const router = Router();

// *** Task Routes ***

// Post
router.post('/', createTask);

// Get
router.get('/:user_id', readTask);

// Put/Patch
router.put('/:task_id', updateTask);


// Delete
router.delete('/:task_id', deleteTask);

// *** Subtask Routes ***

// Post
router.post('/:task_id/subtask', createSubtask);

// Get
// router.get();

// Put/Patch
router.put('/:task_id/subtask/:subtask_id', updateSubtask);

// Delete
router.delete('/:task_id/subtask/:subtask_id', deleteSubtask);

export default router;