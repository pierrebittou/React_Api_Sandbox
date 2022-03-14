import React, { useState } from "react";
import { Card, Button, Alert, Form, Container } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext.js";
import { Link, useHistory } from "react-router-dom";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=6d4168952f4841ab9cccc39d98b9262a&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function AddServices() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Add Services</h2>
          <div className=" text-center container my-5">
            <ul className="list-group">
              <Container>
                <a className="btn btn-success btn-lg" href={AUTH_URL}>
                  Login with Spotify
                </a>
              </Container>
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
