import React from "react";
import { useNavigate } from "react-router-dom";

const VolunteerDetails = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/volunteers")}>Go Back</button>
    </div>
  );
};

export default VolunteerDetails;
