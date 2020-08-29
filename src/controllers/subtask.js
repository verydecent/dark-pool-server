import models from '../models';
import { mongoose } from 'mongoose';

export const createSubtask = (req, res) => {
    const { task_id } = req.params;

    const newSubtask = new models.Subtask({
        complete: false,
        description: '',
        task_id: task_id
    });

    models.Task.findOne({ _id: task_id }, function (err, doc) {
        const task = doc;
        task.subtasks.push(newSubtask)
        task.save(function (err, doc) {
            if (err) res.status(500).json(err);
            res.status(200).json(doc);
        });
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
    console.log('req.params', req.params);
    const { task_id, subtask_id } = req.params;
    const { complete, description } = req.body;

    models.Task.findOne({ _id: task_id }, function (err, doc) {
        const updatedSubtasks = doc.subtasks.map(subtask => {
            // subtask._id typeof equates to object, so we have to turn it into a string if we use strict comparison operator
            const subtaskIdToString = subtask._id.toString();
            if (subtaskIdToString === subtask_id) {
                subtask.complete = complete;
                subtask.description = description;
            }
            return subtask;
        });

        doc.subtasks = updatedSubtasks;
        doc.save(function (err, doc) {
            if (err) res.status(500).json(err);
            res.status(200).json(doc);
        });
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