import { createSlice } from "@reduxjs/toolkit";
import {
  addVolunteerAsync,
  deleteVolunteerAsync,
  fetchVolunteers,
  updateVolunteerAsync,
} from "./volunteerApi";

const initialState = {
  volunteers: [],
  status: "idle",
  error: null,
  showVolunteerForm: false,
};

const volunteersSlice = createSlice({
  name: "volunteers",
  initialState,
  reducers: {
    setShowVolunteerForm: (state, action) => {
      state.showVolunteerForm = action.payload;
    },
  },
  extraReducers: {
    [fetchVolunteers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchVolunteers.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers = action.payload;
    },
    [fetchVolunteers.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [addVolunteerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addVolunteerAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers.push(action.payload);
    },
    [addVolunteerAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [updateVolunteerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateVolunteerAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedVolunteer = action.payload;
      const index = state.volunteers.findIndex(
        (volunteer) => volunteer._id === updatedVolunteer._id
      );
      if (index !== -1) {
        state.volunteers[index] = updatedVolunteer;
      }
    },
    [updateVolunteerAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [deleteVolunteerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteVolunteerAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers = state.volunteers.filter(
        (volunteer) => volunteer._id !== action.payload._id
      );
    },
    [deleteVolunteerAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { setShowVolunteerForm } = volunteersSlice.actions;

export default volunteersSlice.reducer;
