import { Router } from 'express';
import models from '../models';

const router = Router();

router.get('/', (req, res) => {
  res.json('get task 200');
});

router.post('/', (req, res) => {
  const newTask = new models.Task({
    user_id: req.body.user_id,
    title: '',
    description: ''
  });

  newTask.save(function(err, doc) {
    if (err) return res.status(500).json(err);
    res.status(200).json({ data: doc });
  });
});

export default router;