import React, { useState } from "react";
import { Card, Button, Alert, Form } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext.js";
import { Link, useHistory } from "react-router-dom";

export default function SettingsNavigation() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.pushState("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Settings</h2>
          <div className=" text-center container my-5">
            <h3>
              <button className="btn btn-secondary" onClick={""}>
                Profile
              </button>
            </h3>
            <ul className="list-group">
              <li className="list-group-item mb-2">
                <h6>
                  Your email addess is your identity on this app and is used to
                  log in
                </h6>
              </li>
            </ul>
            <h3>
              <button className="btn btn-secondary" onClick={""}>
                Password
              </button>
            </h3>
            <ul className="list-group">
              <li className="list-group-item mb-2">
                <h6>Here your can change your password</h6>
              </li>
            </ul>
            <h3>
              <button className="btn btn-secondary" onClick={""}>
                API
              </button>
            </h3>
            <ul className="list-group">
              <li className="list-group-item mb-2">
                <h6>
                  Here you can see the connected API and remove or add API and
                  see all API key
                </h6>
              </li>
            </ul>
            <h3>
              <button className="btn btn-secondary" onClick={""}>
                Help
              </button>
            </h3>
            <ul className="list-group">
              <li className="list-group-item mb-2">
                <h6>Click here if you want help</h6>
              </li>
            </ul>
          </div>
        </Card.Body>
        <div className="w-100 text-center mt-2"></div>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={() => history.goBack()}>
          Cancel
        </Button>
      </div>
    </>
  );
}
