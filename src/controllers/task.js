const models = require('../models');

const readTask = (req, res) => {
  const { user_id } = req.params;
  const { start_date, end_date } = req.query;

  models.Task.find({
    user_id: user_id,
    createdAt: {
      $gte: start_date,
      $lte: end_date
    }
  }, function (err, doc) {
    res.status(200).json(doc);
  });
}

const createTask = (req, res) => {
  const { user_id } = req.params;
  const newTask = new models.Task({
    user_id: user_id,
    title: '',
    description: ''
  });

  console.log('newTask', newTask);

  newTask.save(function (err, doc) {
    if (err) return res.status(500).json(err);
    res.status(200).json(doc);
  });
};

const updateTask = (req, res) => {
  console.log('PUT request for TASK', req.body);

  models.Task.findByIdAndUpdate(req.params.task_id, req.body, { new: true }, function (err, doc) {
    if (err) res.status(500).json(err);
    console.log('~~~ PUT document ~~~');
    res.status(200).json(doc);
  });
};

const deleteTask = (req, res) => {
  console.log('task delete route', req.params.task_id);
  models.Task.findOne({ _id: req.params.task_id }, function (err, doc) {
    if (err || !doc) res.status(400).json(err);

    doc.remove(function (err, doc) {
      if (err) res.status(500).json(err);
      res.status(200).json(doc);
    });
  });
};

module.exports = {
  readTask,
  createTask,
  updateTask,
  deleteTask
}