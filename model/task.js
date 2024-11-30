const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: {
    type: Date,
    require: true,
  },
  priority: {
    type: String,
    require: true,
    enum: ["low", "medium", "high"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
