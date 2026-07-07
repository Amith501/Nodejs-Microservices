import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const Listcomments = ({ postId }) => {
  const [comments, setcomments] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4001/posts/${postId}/comments`,
      );
      setcomments(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const renderedcomments = comments.map((comment) => {
    return (
      <div>
        <li key={comment.id}>{comment.content}</li>
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
