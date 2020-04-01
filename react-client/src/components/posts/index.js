import React from "react";
import { Button } from "react-bootstrap";
import { deauthorize } from "../../actions/authorization";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./styles.module.css";

export default function Posts() {
  const dispatchAction = useDispatch();

  return (
    <div className={styles["parent-container-home"]}>
      <Link to="my-posts">
        <Button variant="outline-primary">My Posts</Button>
      </Link>
      <Link to="all-posts">
        <Button variant="outline-primary">All Posts</Button>
      </Link>
      <Button
        variant="outline-warning"
        onClick={() => dispatchAction(deauthorize())}
      >
        Logout
      </Button>
    </div>
  );
}
