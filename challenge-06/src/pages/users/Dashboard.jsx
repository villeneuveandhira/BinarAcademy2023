import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getMe } from "../../Redux/Actions/authActions";

function Dashboard() {
  // To set the state of the store and set navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the store to get user
  const { user } = useSelector((state) => state.auth);

  // Fetch user from the server when the component mounts
  useEffect(() => {
    dispatch(getMe(navigate, null, null));
  }, [dispatch, navigate]);

  return (
    <>
      <Container className="p-4">
        <h1 className="text-center">
          Hi, {user?.name} <br/> with {user?.email}
        </h1>
      </Container>
    </>
  );
}

export default Dashboard;