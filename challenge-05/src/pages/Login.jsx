import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import GoogleLogin from "../components/GoogleLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = JSON.stringify({
        email,
        password,
      });

      let config = {
        method: "post",
        url: `${import.meta.env.VITE_API}/v1/auth/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      localStorage.setItem("token", token);

      // Temporary solution
      window.location.href = "/";
    } catch (error) {
      console.log("Error occurred:", error);
      if (axios.isAxiosError(error)) {
        return toast.error(error.response.data.message);
        ;
      }
      toast.error(error.message);
    }
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