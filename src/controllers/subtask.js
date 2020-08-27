import models from '../models';

export const createSubtask = (req, res) => {
    const newSubtask = new models.Subtask({
        complete: false,
        description: '',
        task_id: req.params.task_id
    });

    newSubtask.save(function (err, doc) {
        if (err) res.status(500).json(err);
        res.status(200).json(doc);
    });
};

export const readSubtasks = (req, res) => {
    models.Subtask.find({ task_id: req.params.task_id }, function (err, doc) {
        if (err) res.status(500).json(err);
        console.log(doc);
        res.status(200).json(doc);
    });
};

export const readSubtask = (req, res) => {
    models.Subtask.find({ _id: req.params.subtask_id }, function (err, doc) {
        if (err) res.status(500).json(err);
        res.status(200).json(doc);
    });
};

export const updateSubtask = (req, res) => {
    models.Subtask.findByIdAndUpdate(req.params.subtask_id, req.body, { new: true }, function (err, doc) {
        if (err) res.status(500).json(err)
        res.status(200).json(doc);
    });
};

export const deleteSubtask = (req, res) => {
    models.Subtask.findOne({ _id: req.params.subtask_id }, function (err, doc) {
        if (err || !doc) res.status(400).json(err);

        doc.remove(function (err, doc) {
            if (err) res.status(500).json(err);
            res.status(200).json(doc);
        });
    });
};