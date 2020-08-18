import { Router } from 'express';
import {
    createSubtask,
    readSubtasks,
    readSubtask,
    updateSubtask,
    deleteSubtask
} from '../controllers/subtask';

const router = Router();

router.post('/:task_id', createSubtask);

router.get('/:task_id', readSubtasks);

router.get('/single/:subtask_id', readSubtask);

router.put('/:subtask_id', updateSubtask);

router.delete('/:subtask_id', deleteSubtask);

export default router;