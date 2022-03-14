import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext.js";
import { Link, useHistory } from "react-router-dom";
import Logo from "../Assets/Logo-dark.png";
import { auth } from "../firebase.js";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value).then(
        (userCredential) => userCredential.user.sendEmailVerification()
      );
      alert("Email sent");
      history.push("/login");
    } catch {
      setError("Failed to create an account ");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="text-center">
        <img src={Logo} />
      </div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign up </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email </Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password (6 characters min) </Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Password confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Sign up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account ? <Link to="/login"> Log in</Link>
      </div>
    </>
  );
}
