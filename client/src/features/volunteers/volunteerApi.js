import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:4000/volunteer";

export const fetchVolunteers = createAsyncThunk(
  "volunteers/fetchVolunteers",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data.volunteers;
  }
);

export const addVolunteerAsync = createAsyncThunk(
  "volunteers/addVolunteerAsync",
  async (newVolunteer) => {
    const response = await axios.post(BASE_URL, newVolunteer);
    return response.data.volunteer;
  }
);

export const updateVolunteerAsync = createAsyncThunk(
  "volunteers/updateVolunteerAsync",
  async ({ id, updatedVolunteer }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedVolunteer);
    return response.data.volunteer;
  }
);

export const deleteVolunteerAsync = createAsyncThunk(
  "volunteers/deleteVolunteerAsync",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data.volunteer;
  }
);
