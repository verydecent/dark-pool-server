import { Router } from 'express';
import models from '../models';

const router = Router();

router.post('/', (req, res) => {
    console.log('=== req.body ===', req.body);

    const newSubtask = new models.Subtask({
        complete: req.body.complete,
        description: req.body.description,
        task_id: req.body.task_id
    });

    newSubtask.save(function(err, doc) {
        if (err) res.status(500).json(err);
        res.status(200).json(doc);
    });
});

router.get('/:task_id', (req, res) => {
    console.log('req.params', req.params);
    models.Subtask.find({ task_id: req.params.task_id }, function(err, doc) {
        if (err) res.status(500).json(err);
        console.log(doc);
        res.status(200).json(doc);
    })
});

export default router;