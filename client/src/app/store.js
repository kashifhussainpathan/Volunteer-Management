import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "../features/events/EventSlice";
import volunteersReducer from "../features/volunteers/volunteerSlice";

export default configureStore({
  reducer: {
    events: eventsReducer,
    volunteers: volunteersReducer,
  },
});
