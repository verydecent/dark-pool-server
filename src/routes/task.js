import { Router } from 'express';
import {
  createTask,
  updateTask,
  deleteTask,
  readTask
} from '../controllers/task';

const router = Router();

router.get('/:user_id', readTask);

router.post('/', createTask);

router.put('/:task_id', updateTask);

router.delete('/:task_id', deleteTask);

export default router;