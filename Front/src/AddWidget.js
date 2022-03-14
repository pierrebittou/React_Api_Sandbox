import React, { useState, Component } from "react";
import { Card, Button, Alert, Form } from "react-bootstrap";
import { useAuth } from "./Context/AuthContext.js";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";

export default function AddWidget() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  let City;
  const options = [
    { value: "Weather", label: "Weather" },
    { value: "Spotify", label: "Spotify" },
    { value: "Youtube", label: "Youtube" },
  ];

  const SelectValue = () => <Select className="" options={options} />;

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Add Widget</h2>
          <div className=" text-center container my-5">
            <ul className="list-group">
              <SelectValue />
            </ul>
            <ul>
              <Form.Control
                value={City}
                // disabled={true}
                placeholder="Enter a city"
                className="text-center mt-4"
              />
            </ul>
          </div>
          <Link to="/" className="btn btn-primary w-100 mt-3">
            Save
          </Link>
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
