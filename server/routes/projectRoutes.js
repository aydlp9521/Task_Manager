const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

console.log("project routes loaded");

/* =========================
   GET ALL PROJECTS
========================= */
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   GET SINGLE PROJECT
========================= */
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   CREATE PROJECT
========================= */
router.post("/", async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      desc: req.body.desc,
      deadline: req.body.deadline,
      status: req.body.status || "Active",
      assignedMembers: req.body.assignedMembers || []
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   UPDATE PROJECT
========================= */
router.put("/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   DELETE PROJECT
========================= */
router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;