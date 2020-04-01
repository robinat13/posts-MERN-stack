import React, { useEffect, useState } from "react";
import { getCall } from "../../api-utils/apiCalls";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deauthorize } from "../../actions/authorization";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const dispatchAction = useDispatch();

  useEffect(() => {
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
  }, []);

  return (
    <div>
      {posts.length &&
        posts.map((item, index) => (
          <div key={index}>
            <span>Post title : {item.title}</span>
            <span>Post Description : {item.description}</span>
          </div>
        ))}
      <Button
        variant="outline-warning"
        onClick={() => dispatchAction(deauthorize())}
      >
        Logout
      </Button>
    </div>
  );
}
