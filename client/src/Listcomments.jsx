import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const Listcomments = ({ comments }) => {
  // const [comments, setcomments] = useState([]);
  // const fetchData = async () => {
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:4001/posts/${postId}/comments`,
  //     );
  //     setcomments(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  const renderedcomments = comments.map((comment) => {
    let content;
    if (comment.status === "approved") {
      content = comment.content;
    }
    if (comment.status === "pending") {
      content = "this comment is in awaiting moderation";
    }

    if (comment.status === "rejected") {
      content = "this comment has been rejected";
    }
    return (
      <div>
        <li key={comment.id}>{content}</li>
      </div>
    );
  });
  return (
    <div>
      <ul>{renderedcomments}</ul>
    </div>
  );
};

export default Listcomments;
