import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import GoogleLogin from "../components/GoogleLogin";
import { register } from "../Redux/Actions/authActions";

function Register() {
  // To set the state of the store and set navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize state for user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register with name, email, and password when onClick submit button
  const onSubmit = async (e) => {
    e.preventDefault();

    let data = JSON.stringify({
      name,
      email,
      password,
    });

    dispatch(register(data, navigate));
  };

  return (
    <>
      <Container className="p-4">
        <Row>
          <Col>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

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
                Register Now
              </Button>
              <GoogleLogin buttonText="Sign in with Google" />
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;