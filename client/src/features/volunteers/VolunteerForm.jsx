import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { fetchEvents } from "../events/eventApi";
import { useDispatch, useSelector } from "react-redux";
import { setShowVolunteerForm } from "./volunteerSlice";
import {
  addVolunteerAsync,
  updateVolunteerAsync,
} from "../volunteers/volunteerApi";

const VolunteerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { events } = useSelector(({ events }) => events);
  console.log(events);
  const volunteer = state ? state : null;

  const [volunteerInput, setVolunteerInput] = useState({
    name: volunteer ? volunteer.name : "",
    contact: volunteer ? volunteer.contact : 0,
    skills: volunteer ? volunteer.skills.join(", ") : "",
    availability: volunteer ? volunteer.availability : false,
    areasOfInterest: volunteer ? volunteer.areasOfInterest.join(", ") : "",
    events: volunteer ? volunteer.events.map(({ _id }) => _id) : [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (volunteer) {
      dispatch(
        updateVolunteerAsync({
          id: volunteer._id,
          updatedVolunteer: volunteerInput,
        })
      );
      //   navigate(`/volunteers/${volunteer._id}`);
    } else {
      dispatch(
        addVolunteerAsync({
          ...volunteerInput,
          events: volunteerInput.events.length
            ? volunteerInput.events
            : events[0]._id,
        })
      );
      navigate("/");
    }
  };

  const hideVolunteerFormHandler = () => {
    dispatch(setShowVolunteerForm(false));
  };

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  return (
    <div className="page">
      <h2>{volunteer ? "Edit" : "Add"} Volunteer</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter Name"
          type="text"
          value={volunteerInput.name}
          onChange={(e) =>
            setVolunteerInput({
              ...volunteerInput,
              name: e.target.value,
            })
          }
          required
        />
        <strong>Contact: </strong>
        <input
          placeholder="Contact"
          type="number"
          min={0}
          value={volunteerInput.contact}
          onChange={(e) =>
            setVolunteerInput({
              ...volunteerInput,
              contact: e.target.value,
            })
          }
          required
        />
        <strong>Skills:</strong>
        <input
          placeholder="Separated by commas"
          type="text"
          value={volunteerInput.skills}
          onChange={(e) =>
            setVolunteerInput({
              ...volunteerInput,
              skills: e.target.value.replace(/ /g, "").split(","),
            })
          }
          required
        />
        <strong>Availability: </strong>
        <input
          type="radio"
          name="availability"
          value={"Yes"}
          key={"Yes"}
          defaultChecked={volunteerInput.availability}
          onChange={(e) =>
            e.target.checked &&
            setVolunteerInput({ ...volunteerInput, availability: true })
          }
        />{" "}
        Yes
        <input
          type="radio"
          name="availability"
          value={"No"}
          key={"No"}
          defaultChecked={!volunteerInput.availability}
          onChange={(e) =>
            e.target.checked &&
            setVolunteerInput({
              ...volunteerInput,
              availability: false,
            })
          }
        />{" "}
        No
        <strong>Areas of Interest: </strong>
        <input
          placeholder="Separated by commas"
          type="text"
          value={volunteerInput.areasOfInterest}
          onChange={(e) =>
            setVolunteerInput({
              ...volunteerInput,
              areasOfInterest: e.target.value.replace(/ /g, "").split(","),
            })
          }
          required
        />
        <strong>Events: </strong>
        {events.map(({ _id, name }) => (
          <label key={_id}>
            <input
              type="radio"
              value={_id}
              key={_id}
              defaultChecked={volunteerInput.events.includes(_id)}
              onChange={(e) =>
                e.target.checked &&
                setVolunteerInput({
                  ...volunteerInput,
                  events: [...volunteerInput.events, _id],
                })
              }
            />{" "}
            {name}
          </label>
        ))}
        <button type="submit">{volunteer ? "Update" : "Add"} Volunteer</button>
        <button onClick={hideVolunteerFormHandler}>Close</button>
      </form>
    </div>
  );
};

export default VolunteerForm;
