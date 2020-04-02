import React from "react";
import { Button } from "react-bootstrap";
import { deauthorize } from "../../actions/authorization";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { postCall } from "../../api-utils/apiCalls";

export default function Posts() {
  const dispatchAction = useDispatch();

  const logout = async () => {
    const response = await postCall("auth/logout", {}, true);
    if (response.type === "SUCCESS") {
      dispatchAction(deauthorize());
    } else alert("Some Error occured, please try again later");
  };

  return (
    <div className={styles["parent-container-home"]}>
      <Link to="my-posts">
        <Button variant="outline-primary">My Posts</Button>
      </Link>
      <Link to="all-posts">
        <Button variant="outline-primary">All Posts</Button>
      </Link>
      <Button variant="outline-warning" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
