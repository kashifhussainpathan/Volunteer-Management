import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import VolunteerForm from "./VolunteerForm";
import { deleteVolunteerAsync } from "./volunteerApi";
import { useDispatch, useSelector } from "react-redux";
import { setShowVolunteerForm } from "./volunteerSlice";

const VolunteerDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { volunteerId } = useParams();

  const { showVolunteerForm } = useSelector(({ volunteers }) => volunteers);
  const volunteer = useSelector((state) =>
    state.volunteers.volunteers.find(
      (volunteer) => volunteer._id === volunteerId
    )
  );

  const handleDeleteVolunteer = () => {
    dispatch(deleteVolunteerAsync(volunteer._id));
    navigate("/volunteers");
  };

  const handleEditVolunteerClick = () => {
    dispatch(setShowVolunteerForm(true));
  };

  if (!volunteer) {
    return <div>Volunteer not found.</div>;
  }

  return (
    <div className="volunteer-details-container">
      {showVolunteerForm && (
        <div>
          <div
            className="overlay"
            onClick={() => dispatch(setShowVolunteerForm(false))}
          ></div>
          <div className="modal">
            <VolunteerForm />
          </div>
        </div>
      )}

      <div>
        <h2>Volunteer Details</h2>
        <ul>
          <li>Name: {volunteer.name}</li>
          <li>Contact: {volunteer.contact}</li>
          <li>Skills: {volunteer.skills.join(", ")}</li>
          <li>
            Availability:{" "}
            {volunteer.availability ? "Available" : "Not Available"}
          </li>
          <li>Areas of Interest: {volunteer.areasOfInterest.join(", ")}</li>
          <ol>
            Events:{" "}
            {volunteer.events.map(({ _id, name }) => (
              <li key={_id}>{name} </li>
            ))}
          </ol>
        </ul>

        <div className="volunteer-details-buttons">
          <button onClick={() => navigate("/volunteers")}>Go Back</button>
          <button onClick={handleDeleteVolunteer}>Delete Volunteer</button>
          <button onClick={handleEditVolunteerClick}>Edit Volunteer</button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDetails;
