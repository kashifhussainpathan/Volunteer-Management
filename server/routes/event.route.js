const express = require("express");

const {
  getAllEvents,
  addEvent,
  editEvent,
  deleteEvent,
  getEvent,
} = require("../controllers/event.controller");

const eventRouter = express.Router();

eventRouter.get("/", async (req, res) => {
  try {
    const allEvents = await getAllEvents();
    res
      .status(201)
      .json({ message: "All events fetched successfully", events: allEvents });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all events" });
  }
});

eventRouter.post("/", async (req, res) => {
  try {
    const newEvent = await addEvent(req.body);
    if (newEvent) {
      res
        .status(201)
        .json({ message: "New event added successfully", event: newEvent });
    } else {
      res.status(404).json({ error: "Unable to add event" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add event" });
  }
});

eventRouter.get("/:eventName", async (req, res) => {
  try {
    const selectedEvent = await getEvent(req.params.eventName);
    if (selectedEvent) {
      res
        .status(201)
        .json({ message: "Event fetched successfully", event: selectedEvent });
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event", error });
  }
});

eventRouter.put("/:eventId", async (req, res) => {
  try {
    const updatedEvent = await editEvent(req.params.eventId, req.body);
    if (updatedEvent) {
      res
        .status(201)
        .json({ message: "Updated event successfully", event: updatedEvent });
    } else {
      res.status(500).json({ error: "Unable to update event" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update event" });
  }
});

eventRouter.delete("/:eventId", async (req, res) => {
  try {
    const deletedEvent = await deleteEvent(req.params.eventId);
    if (deletedEvent) {
      res
        .status(201)
        .json({ message: "Event deleted successfully", event: deletedEvent });
    } else {
      res.status(500).json({ error: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

module.exports = eventRouter;
