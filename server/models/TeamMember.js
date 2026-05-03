const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String
});

module.exports = mongoose.model("TeamMember", teamSchema);