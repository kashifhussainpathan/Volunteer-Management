const express = require("express");

const {
  getAllVolunteers,
  addVolunteer,
  editVolunteer,
  deleteVolunteer,
  getVolunteer,
} = require("../controllers/volunteer.controller");

const volunteerRouter = express.Router();

volunteerRouter.get("/", async (req, res) => {
  try {
    const allVolunteers = await getAllVolunteers();
    res.status(201).json({
      message: "Volunteers fetched successfully",
      volunteers: allVolunteers,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all volunteers" });
  }
});

volunteerRouter.post("/", async (req, res) => {
  try {
    const newVolunteer = await addVolunteer(req.body);
    if (newVolunteer) {
      res.status(201).json({
        message: "New volunteer added successfully",
        volunteer: newVolunteer,
      });
    } else {
      res.status(404).json({ error: "Unable to add volunteer" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add volunteer" });
  }
});

volunteerRouter.get("/:volunteerName", async (req, res) => {
  try {
    const selectedVolunteer = await getVolunteer(req.params.volunteerName);
    if (selectedVolunteer) {
      res.status(201).json({
        message: "Volunteer fetched successfully",
        volunteer: selectedVolunteer,
      });
    } else {
      res.status(404).json({ error: "Volunteer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch volunteer", error });
  }
});

volunteerRouter.post("/:volunteerId", async (req, res) => {
  try {
    const updatedVolunteer = await editVolunteer(
      req.params.volunteerId,
      req.body
    );
    if (updatedVolunteer) {
      res.status(201).json({
        message: "Updated volunteer successfully",
        volunteer: updatedVolunteer,
      });
    } else {
      res.status(500).json({ error: "Unable to update volunteer" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update volunteer" });
  }
});

volunteerRouter.delete("/:volunteerId", async (req, res) => {
  try {
    const deletedVolunteer = await deleteVolunteer(req.params.volunteerId);
    if (deletedVolunteer) {
      res.status(201).json({
        message: "Volunteer deleted successfully",
        volunteer: deletedVolunteer,
      });
    } else {
      res.status(500).json({ error: "Volunteer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete volunteer" });
  }
});

module.exports = volunteerRouter;
