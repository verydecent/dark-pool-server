import { Router } from 'express';
import models from '../models';

const router = Router();

router.post('/:task_id', (req, res) => {
    console.log('=== req.body ===', req.body);

    const newSubtask = new models.Subtask({
        complete: false,
        description: '',
        task_id: req.params.task_id
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

router.get('/single/:subtask_id', (req, res) => {
    models.Subtask.find({ _id: req.params.subtask_id }, function(err, doc) {
        if (err) res.status(500).json(err);
        res.status(200).json(doc);
    })
})

router.put('/:subtask_id', (req, res) => {
    models.Subtask.findByIdAndUpdate(req.params.subtask_id, req.body, { new: true }, function(err, doc) {
        if (err) res.status(500).json(err)
        console.log(doc);
        res.status(200).json(doc);
    });
});

router.delete('/:subtask_id', (req, res) => {
    models.Subtask.findOne({ _id: req.params.subtask_id }, function(err, doc) {
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