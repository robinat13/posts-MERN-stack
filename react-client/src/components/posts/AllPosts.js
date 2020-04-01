import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { getCall } from "../../api-utils/apiCalls";
import Post from "./Post";
import { Alert } from "react-bootstrap";

export default function AllPosts() {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await getCall("posts/all", true);

        if (response.type === "SUCCESS") {
          setAllPosts(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getPosts();
  }, []);

  return (
    <div
      className={styles["parent-container"]}
      style={{ flexDirection: "column", justifyContent: "center" }}
    >
      {allPosts.length ? (
        allPosts.map((item, index) => (
          <div key={index} className={`${styles["post"]} w-75`}>
            <Post item={item} key={index} allPosts />
          </div>
        ))
      ) : (
        <Alert variant="info">No Posts</Alert>
      )}
    </div>
  );
}
