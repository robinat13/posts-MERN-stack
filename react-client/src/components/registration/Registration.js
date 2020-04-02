import React, { useState, useEffect } from "react";
import styles from "./registration.module.css";
import { Card, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { postCall } from "../../api-utils/apiCalls";
import { useSelector } from "react-redux";

const initialFormState = {
  name: "",
  username: "",
  password: ""
};

const Registration = () => {
  const [formState, setFormState] = useState(initialFormState);

  const handleChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const authorized = useSelector(state => state.authorization.authorized);
  const history = useHistory();

  useEffect(() => {
    if (authorized) {
      history.push("posts");
    }
    // eslint-disable-next-line
  }, [authorized]);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await postCall("registration", formState);
    console.log(response);
  };

  return (
    <div className={styles["parent-container"]}>
      <Card className="w-25">
        <Card.Header>
          <Card.Title>Registration</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formState.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                value={formState.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formState.password}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="outline-primary" block type="submit">
                Register
              </Button>
            </div>
          </Form>
          <div className="text-center mt-3">
            Have an account ?{" "}
            <Link to="/">
              <span className="text-info">Login</span>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Registration;
