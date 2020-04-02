import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import { Card, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { postCall } from "../../api-utils/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { authorize } from "../../actions/authorization";

const initialFormState = {
  username: "",
  password: ""
};

const Login = () => {
  const [formState, setFormState] = useState(initialFormState);
  const dispatchAction = useDispatch();
  const history = useHistory();

  const authorized = useSelector(state => state.authorization.authorized);

  useEffect(() => {
    if (authorized) {
      history.push("posts");
    }
    // eslint-disable-next-line
  }, [authorized]);

  const handleChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    let response;
    e.preventDefault();
    try {
      response = await postCall("auth/login", formState);
    } catch (err) {
      console.log(err);
    }
    if (response.type === "SUCCESS") {
      dispatchAction(
        authorize({
          token: response.data.token,
          refreshToken: response.data.refreshToken
        })
      );
      history.push("/posts");
    }
  };

  return (
    <div className={styles["parent-container"]}>
      <Card className="w-25">
        <Card.Header>
          <Card.Title>Login</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
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
                Login
              </Button>
            </div>
          </Form>
          <div className="text-center mt-3">
            New user ?{" "}
            <Link to="registration">
              <span className="text-info">Register yourself</span>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
