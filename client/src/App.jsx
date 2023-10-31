import { NavLink, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import EventView from "./pages/eventView/EventView";
import EventDetails from "./features/events/EventDetails";
import VolunteerView from "./pages/volunteerView/VolunteerView";
import VolunteerDetails from "./features/volunteers/VolunteerDetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventView />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/volunteers" element={<VolunteerView />} />
        <Route path="/volunteers/:volunteerId" element={<VolunteerDetails />} />
      </Routes>
    </>
  );
}

export default App;
