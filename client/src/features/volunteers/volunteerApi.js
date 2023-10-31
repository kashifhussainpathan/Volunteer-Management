import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://volunteer-management-qrrv.onrender.com/volunteer";

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
    // await axios.post(`${BASE_URL}/${id}`, updatedVolunteer);
    const response = await axios.post(`${BASE_URL}/${id}`, updatedVolunteer);
    console.log(response.data.volunteer);
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
