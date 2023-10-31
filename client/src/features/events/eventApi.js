import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:4000/event";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await axios.get(BASE_URL);
  return response.data.events;
});

export const addEventAsync = createAsyncThunk(
  "events/addEventAsync",
  async (newEvent) => {
    const response = await axios.post(BASE_URL, newEvent);
    return response.data.event;
  }
);

export const updateEventAsync = createAsyncThunk(
  "events/updateEventAsync",
  async ({ id, updatedEvent }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedEvent);
    return response.data.event;
  }
);

export const deleteEventAsync = createAsyncThunk(
  "events/deleteEventAsync",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data.event;
  }
);
