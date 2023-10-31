import { NavLink, Route, Routes } from "react-router-dom";

import EventView from "./pages/eventView/EventView";
import VolunteerView from "./pages/volunteerView/VolunteerView";
import VolunteerDetails from "./features/volunteers/VolunteerDetails";

function App() {
  return (
    <>
      <div>
        <NavLink to="/events"> Events</NavLink>
        <NavLink to="/volunteers"> Volunteers</NavLink>
      </div>

      <Routes>
        <Route path="/events" element={<EventView />} />
        <Route path="/volunteers" element={<VolunteerView />} />
        <Route path="/volunteers/:volunteerId" element={<VolunteerDetails />} />
      </Routes>
    </>
  );
}

export default App;
