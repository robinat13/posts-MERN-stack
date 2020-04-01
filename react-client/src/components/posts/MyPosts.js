import React, { useEffect, useState } from "react";
import {
  getCall,
  patchCall,
  postCall,
  deleteCall
} from "../../api-utils/apiCalls";
import { Button, Alert, Form } from "react-bootstrap";
import styles from "./styles.module.css";
import Post from "./Post";

const initialNewPost = {
  title: "",
  description: ""
};

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const [newPost, setNewPost] = useState(initialNewPost);
  const [editPostSuccess, setEditPostSuccess] = useState(false);

  useEffect(() => {
    setEditPostSuccess(false);
    async function getPosts() {
      try {
        const response = await getCall("posts", true);

        if (response.type === "SUCCESS") {
          setPosts(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getPosts();
  }, [editPostSuccess]);

  const postEdited = async (id, payload) => {
    try {
      const response = await patchCall(`posts/${id}`, payload, true);
      if (response.type === "SUCCESS") {
        setEditPostSuccess(true);
        return true;
      }
    } catch {
      return false;
    }
  };

  const deletePost = async id => {
    try {
      const response = await deleteCall(`posts/${id}`, true);
      if (response.type === "SUCCESS") {
        setEditPostSuccess(true);
        return true;
      }
    } catch {
      return false;
    }
  };

  const addPost = async () => {
    try {
      const response = await postCall("posts", newPost, true);
      if (response.type === "SUCCESS") {
        setEditPostSuccess(true);
        setShowAddPost(false);
        setNewPost(initialNewPost);
      }
    } catch (err) {
      alert("Some error occurred, check console for more details");
      console.log(err);
    }
  };

  const handleChange = async e => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  return (
    <div
      className={styles["parent-container"]}
      style={{ flexDirection: "column", justifyContent: "center" }}
    >
      {posts.length ? (
        posts.map((item, index) => (
          <div key={index} className={`${styles["post"]} w-75`}>
            <Post
              item={item}
              key={index}
              postEdited={postEdited}
              deletePost={deletePost}
            />
          </div>
        ))
      ) : (
        <Alert variant="info">No Posts</Alert>
      )}
      {!showAddPost && (
        <Button
          variant="outline-success"
          className="w-25 mt-3"
          onClick={() => setShowAddPost(true)}
        >
          Add Post
        </Button>
      )}
      {showAddPost && (
        <Form className="w-75 mt-2">
          <Form.Group>
            <Form.Label>Post Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter post title"
              value={newPost.title}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Post Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Enter post description"
              value={newPost.description}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <div className="text-center">
            <Button variant="outline-primary" onClick={addPost}>
              Add
            </Button>
            <Button
              variant="outline-warning ml-2"
              onClick={() => {
                setNewPost(initialNewPost);
                setShowAddPost(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
}
