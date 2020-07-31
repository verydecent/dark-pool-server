import { Router } from 'express';
import models from '../models';

const router = Router();

router.get('/', (req, res) => {
  res.json('get task 200');
});

router.post('/', (req, res) => {
  console.log('POST request for TASK', req.body);
  const newTask = new models.Task({
    user_id: req.body.user_id,
    title: req.body.title,
    description: req.body.title
  });

  newTask.save(function(err, doc) {
    if (err) return res.status(500).json(err);
    res.status(200).json(doc);
  });
});

export default router;