import React, { useState } from "react";
import styles from "./styles.module.css";
import { Form, Row, Col } from "react-bootstrap";

export default function Post({
  item,
  postEdited,
  deletePost,
  allPosts = false
}) {
  const [editing, setEditing] = useState(false);
  const [formState, setFormState] = useState({ ...item });

  const handleChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const save = async () => {
    const response = await postEdited(item._id, formState);
    if (response) setEditing(false);
    if (!response) alert("Some error occured");
  };

  const _delete = async () => {
    const response = await deletePost(item._id);
    if (response) setEditing(false);
    if (!response) alert("Some error occured");
  };

  return (
    <>
      <Row style={{ verticalAlign: "middle" }}>
        <Col md={3} sm={3} lg={3}>
          <div className={styles["temp"]}>
            <div className="text-info">Post Title :</div>
            <div className="text-info">Post Description :</div>
          </div>
        </Col>
        <Col>
          <div>
            {" "}
            {editing ? (
              <Form.Control
                value={formState.title}
                type="text"
                className={styles["editable"]}
                name="title"
                onChange={handleChange}
              ></Form.Control>
            ) : (
              <span> {item.title}</span>
            )}
          </div>
          <div>
            {" "}
            {editing ? (
              <Form.Control
                value={formState.description}
                type="text"
                className={styles["editable"]}
                name="description"
                onChange={handleChange}
              ></Form.Control>
            ) : (
              <span> {item.description}</span>
            )}
          </div>
        </Col>
        {!allPosts && (
          <Col sm={2} md={2} lg={2}>
            <span className={styles["icon-container"]}>
              {editing ? (
                <span
                  className={`${styles["check-icon"]} material-icons mr-2`}
                  onClick={save}
                >
                  check_circle
                </span>
              ) : (
                <span
                  className={`${styles["modify-icon"]} material-icons mr-2`}
                  onClick={() => setEditing(true)}
                >
                  create
                </span>
              )}
              {editing ? (
                <span
                  className={`${styles["delete-icon"]} material-icons`}
                  onClick={() => {
                    setFormState({ ...item });
                    setEditing(false);
                  }}
                >
                  clear
                </span>
              ) : (
                <span
                  className={`${styles["delete-icon"]} material-icons`}
                  onClick={_delete}
                >
                  delete_forever
                </span>
              )}
            </span>
          </Col>
        )}
      </Row>
    </>
  );
}
