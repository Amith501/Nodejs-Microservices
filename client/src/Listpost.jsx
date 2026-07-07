import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Createcomment from "./Createcomment";
import Listcomments from "./Listcomments";

const Listpost = () => {
  const [posts, setposts] = useState({});

  const fetchposts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/posts");
      setposts(res.data);
      console.log(res);
    } catch (error) {
      console.error;
    }
  };
  useEffect(() => {
    fetchposts();
  }, []);
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        key={post.id}
        className="card"
        style={{ width: "25%", margin: "20px" }}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <Listcomments postId={post.id}/>
          <Createcomment postId={post.id}  />
        </div>
      </div>
    );
  });
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default Listpost;
