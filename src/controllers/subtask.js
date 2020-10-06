const models = require('../models');

const createSubtask = (req, res) => {
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

const updateSubtask = (req, res) => {
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

const deleteSubtask = (req, res) => {
    const { task_id, subtask_id } = req.params;

    models.Task.findOne({ _id: task_id }, function (err, doc) {
        console.log('doc', doc);

        // Target subtask with id
        const task = doc;

        const updatedSubtasks = task.subtasks.filter(subtask => {
            const subtaskIdToString = subtask._id.toString();
            if (subtaskIdToString !== subtask_id) return subtask;
        });

        doc.subtasks = updatedSubtasks;
        doc.save(function (err, doc) {
            if (err) res.status(500).json(err);
            res.status(200).json(doc);
        });
    });
};

module.exports = {
    createSubtask,
    updateSubtask,
    deleteSubtask
}