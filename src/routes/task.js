import { Router } from 'express';
import models from '../models';

const router = Router();

router.get('/:user_id', (req, res) => {
  models.Task.find({ user_id: req.params.user_id }, function(err, doc) {
      if (err) res.status(500).json(err);
      res.status(200).json(doc);
  })
});

router.post('/', (req, res) => {
  console.log('POST request for TASK', req.body);
  const newTask = new models.Task({
    user_id: req.body.user_id,
    title: '',
    description: ''
  });

  newTask.save(function(err, doc) {
    if (err) return res.status(500).json(err);
    res.status(200).json(doc);
  });
});

router.put('/:task_id', (req, res) => {
  console.log('PUT request for TASK', req.body);

  models.Task.findByIdAndUpdate(req.params.task_id, req.body, { new: true }, function(err, doc) {
    if (err) res.status(500).json(err);
    console.log('~~~ PUT document ~~~');
    res.status(200).json(doc);
  });
});

router.delete('/:task_id', (req, res) => {

  models.Task.findOne({ _id: req.params.task_id }, function(err, doc) {
    if (err || !doc) {
      return res.status(400).json(err);
    }

    doc.remove(function(err, doc) {
      if (err) res.status(500).json(err);
      res.status(200).json(doc);
    });
  });
});

export default router;