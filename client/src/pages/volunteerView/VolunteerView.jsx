import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import VolunteerList from "../../features/volunteers/VolunteerList";
import { fetchVolunteers } from "../../features/volunteers/volunteerApi";

const VolunteerView = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(({ volunteers }) => volunteers);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVolunteers());
    }
  }, [status, dispatch]);

  return (
    <div>
      <VolunteerList />
    </div>
  );
};

export default VolunteerView;
