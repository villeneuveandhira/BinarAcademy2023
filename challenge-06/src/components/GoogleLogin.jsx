import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

import { registerLoginWithGoogle } from "../Redux/Actions/authActions";

function GoogleLogin({ buttonText }) {
  // To set the state of the store and set navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Login with google
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      dispatch(registerLoginWithGoogle(responseGoogle.access_token, navigate)),
  });

  return (
    <Button variant="primary" onClick={() => loginWithGoogle()} className="btn-register">
      {buttonText}
    </Button>
  );
}

export default GoogleLogin;