const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  desc: String,
  deadline: String,
  status: {
    type: String,
    default: "Active"
  },
  assignedMembers: [String]
});

module.exports = mongoose.model("Project", projectSchema);