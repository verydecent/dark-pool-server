import models from '../models';
import mongoose from 'mongoose';

export const readtTaskByDate = (req, res) => {
  // Destructure request body

  // Consider how we will get the beginning and end of the date we're retreiving

  // Receive date, create middleware that grabs current date and then gets the beginning time and end time of that specified date?
  // Or resolve logic in front end? No I don't want anything controlled on the front end
  // We will do the logic here

  // Create route that works for componentDidMount on day slection? Or create one that is dynamic where the date is sent from the front end?



  const { user_id, date } = req.body;

  models.Task.find({ user_id, date })
}

export const readTask = (req, res) => {
  console.log('req.query ===> ', req.query);
  console.log('req.params.user_id ===> ', req.params.user_id);

  // Have to use mongoose.Types.ObjectId if you want to use find with an ObjectId

  models.Task.find({
    user_id: mongoose.Types.ObjectId(req.params.user_id),
    createdAt: {
      $gte: req.query.start_date,
      $lte: req.query.end_date
    }
  }, function (err, doc) {
    if (err) res.status(500).json(err);
    console.log('doc ===> ', doc);
    res.status(200).json(doc);
  });
}

export const createTask = (req, res) => {
  console.log('POST request for TASK', req.body);
  const newTask = new models.Task({
    user_id: req.body.user_id,
    title: '',
    description: ''
  });

  newTask.save(function (err, doc) {
    if (err) return res.status(500).json(err);
    res.status(200).json(doc);
  });
};

export const updateTask = (req, res) => {
  console.log('PUT request for TASK', req.body);

  models.Task.findByIdAndUpdate(req.params.task_id, req.body, { new: true }, function (err, doc) {
    if (err) res.status(500).json(err);
    console.log('~~~ PUT document ~~~');
    res.status(200).json(doc);
  });
};

export const deleteTask = (req, res) => {
  console.log('task delete route', req.params.task_id);
  models.Task.findOne({ _id: req.params.task_id }, function (err, doc) {
    if (err || !doc) res.status(400).json(err);

    doc.remove(function (err, doc) {
      if (err) res.status(500).json(err);
      res.status(200).json(doc);
    });
  });
};