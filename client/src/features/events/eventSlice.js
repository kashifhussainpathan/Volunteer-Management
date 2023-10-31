import { createSlice } from "@reduxjs/toolkit";
import {
  addEventAsync,
  deleteEventAsync,
  fetchEvents,
  updateEventAsync,
} from "./eventApi";

const initialState = {
  events: [],
  status: "idle",
  error: null,
  showEventForm: false,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setShowEventForm: (state, action) => {
      state.showEventForm = action.payload;
    },
  },
  extraReducers: {
    [fetchEvents.pending]: (state) => {
      state.status = "loading";
    },
    [fetchEvents.fulfilled]: (state, action) => {
      state.status = "success";
      state.events = action.payload;
    },
    [fetchEvents.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [addEventAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addEventAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.events.push(action.payload);
    },
    [addEventAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [updateEventAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateEventAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedEvent = action.payload;
      const index = state.events.findIndex(
        (event) => event._id === updatedEvent._id
      );
      if (index !== -1) {
        state.events[index] = updatedEvent;
      }
    },
    [updateEventAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [deleteEventAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteEventAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.events = state.events.filter(
        (event) => event._id !== action.payload._id
      );
    },
    [deleteEventAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { setShowEventForm } = eventsSlice.actions;

export default eventsSlice.reducer;
