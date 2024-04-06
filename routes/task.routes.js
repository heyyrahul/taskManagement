const express = require("express");
const { TaskModel } = require("../model/task.model");
const { auth } = require("../middlewares/auth.middlewares")

const taskRouter = express.Router();

// Create a new task
taskRouter.post("/", auth, async (req, res) => {
    const payload = req.body;
    const userId = req.id;
    try {
        const task = new TaskModel({
            ...payload,
            userId
        });
        await task.save();
        res.status(200).json({ msg: "Task created successfully!" });
    }
    catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// Get all tasks for the authenticated user
taskRouter.get("/", auth, async (req, res) => {
    const userId = req.id;
    try {
        const tasks = await TaskModel.find({ userId });
        res.status(200).json(tasks);
    }
    catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// Update a task for the authenticated user
taskRouter.get("/:_id", auth, async (req, res) => {
    const id = req.id;
    const { _id } = req.params;
    try {
        const task = await TaskModel.findOne({ _id });
        const { userId } = task;
        if (userId.toString() === id) {
            res.status(200).json(task);
        }
        else {
            res.status(403).json({ msg: "You are not allowed to access this task" });
        }
    }
    catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// Update a task for the authenticated user
taskRouter.patch("/:_id", auth, async (req, res) => {
    const { _id } = req.params;
    const payload = req.body;
    const id = req.id;
    try {
        const task = await TaskModel.findOne({ _id });
        const { userId } = task;
        if (userId.toString() === id) {
            await TaskModel.findByIdAndUpdate(_id, payload, { new: true });
            res.status(200).json({ msg: "Task has been updated" });
        }
        else {
            res.status(403).json({ msg: "You are not authorized to update this task" });
        }
    }
    catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// Delete a task for the authenticated user
taskRouter.delete("/:_id", auth, async (req, res) => {
    const { _id } = req.params;
    const id = req.id;
    try {
        const task = await TaskModel.findOne({ _id });
        const { userId } = task;
        if (userId.toString() === id) {
            await TaskModel.findByIdAndDelete(_id);
            res.status(200).json({ msg: "Task has been deleted" });
        }
        else {
            res.status(403).json({ msg: "You are not authorized to delete this task" });
        }
    }
    catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

module.exports = {
    taskRouter
}
