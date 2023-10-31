import "./event.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventList from "../../features/events/EventList";
import { fetchEvents } from "../../features/events/eventApi";

const EventView = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(({ events }) => events);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  return (
    <div className="event">
      <EventList />
    </div>
  );
};

export default EventView;
