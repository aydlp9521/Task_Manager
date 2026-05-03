const express = require("express");
const router = express.Router();
const TeamMember = require("../models/TeamMember");

// GET all members
router.get("/", async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD member
router.post("/", async (req, res) => {
  try {
    const member = new TeamMember(req.body);
    const saved = await member.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE member
router.put("/:id", async (req, res) => {
  try {
    const updated = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE member
router.delete("/:id", async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: "Member Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
