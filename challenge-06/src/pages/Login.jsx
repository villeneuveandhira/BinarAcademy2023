import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import GoogleLogin from "../components/GoogleLogin";
import {login} from '../Redux/Actions/authActions';

function Login() {
  // To set the state of the store and set navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize state for user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login with email, and password when onClick submit button
  const onSubmit = async (e) => {
    e.preventDefault();

    let data = JSON.stringify({
      email,
      password,
    });

    dispatch(login(data, navigate));
  };

  return (
    <>
      <Container className="p-4">
        <Row className="mb-4">
          <Col>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="btn-register">
                Login
              </Button>
              <GoogleLogin buttonText="Sign in with Google" />
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;