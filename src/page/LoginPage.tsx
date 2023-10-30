import React from "react";
import { Button, Form } from "react-bootstrap";
import useAuth from "../store/auth";
import Login from "../types/login";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const login = useAuth((state) => state.login);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value: Login = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };
    login(value, navigate);
  };
  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{ background: "#23242a" }}
    >
      <Form onSubmit={submit}>
        <Form.Group controlId="username">
          <Form.Label className="text-light">Username</Form.Label>
          <Form.Control
            //   onChange={handleUser}
            required
            type="text"
            placeholder="username"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label className="text-light">Password</Form.Label>
          <Form.Control
            //   onChange={handleUser}
            required
            type="password"
            placeholder="password"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Button className="mt-3" type="submit">
          Submit form
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
