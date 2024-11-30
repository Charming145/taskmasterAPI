const express = require("express");
const router = express.Router();
const Task = require("../model/task");
// Read
router.get("/all", async (req, res) => {
  try {
    const allTask = await Task.find();
    res.json(allTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Filter by priority
router.get("/filter/priority/:opt", async (req, res) => {
  const opt = req.params.opt;

  try {
    const data = await Task.find({ priority: opt });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Filter by Date
router.get("/filter/date/:opt", async (req, res) => {
  const opt = req.params.opt;
  try {
    const data = await Task.find({
      deadline: opt,
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Search Filter
router.get("/search/:query", async (req, res) => {
  const query = req.params.query;
  console.log(query);
  try {
    const data = await Task.find({
      $or: [
        {
          title: query,
        },
        { description: query },
      ],
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/:id", getTask, (req, res) => {
  res.status(200).json(res.task);
});
// Create
router.post("/add", async (req, res) => {
  const data = req.body;
  const newTask = new Task({
    title: data.title,
    description: data.description,
    deadline: data.deadline,
    priority: data.priority,
  });
  try {
    await newTask.save();
    res.status(201).json({ message: "Task created." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update
router.patch("/:id", getTask, async (req, res) => {
  const data = req.body;
  if (data.title != null) res.task.title = data.title;
  if (data.description != null) res.task.description = data.description;
  if (data.deadline != null) res.task.deadline = data.deadline;
  if (data.priority != null) res.task.priority = data.priority;
  try {
    const t = await res.task.save();
    res.status(200).json({ message: `Task with taskid: ${t._id} updated.` });
  } catch (err) {
    res.json({ message: "Task could not be updated." });
  }
});
// Delete
router.delete("/:id", getTask, async (req, res) => {
  try {
    let t = await res.task.deleteOne();
    console.log(t);
    res.status(200).json({ message: "Task deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
async function getTask(req, res, next) {
  let task;
  console.log(req.params.id);
  try {
    task = await Task.findOne({ _id: req.params.id });
    if (task == null)
      return res.status(401).json({ message: "Task not found" });
  } catch (err) {
    res.json({ message: err.message });
  }
  res.task = task;
  next();
}

module.exports = router;
