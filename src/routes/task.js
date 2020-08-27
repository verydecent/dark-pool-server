import { Router } from 'express';
import {
  createTask,
  updateTask,
  deleteTask,
  readTask
} from '../controllers/task';

const router = Router();

/*
These are for data graphs
// Get all tasks of the year
- beginning date of current year
- last date of current year

// Get monthly task
- beginning date of current month
- last date of current month

// Get weekly tasks
- beginning date of current week
- last date of current week

// Get daily task
- 
*/

// Route for componenetDidMount on the daily view

router.get('/:user_id', readTask);

router.post('/', createTask);

router.put('/:task_id', updateTask);

router.delete('/:task_id', deleteTask);

export default router;