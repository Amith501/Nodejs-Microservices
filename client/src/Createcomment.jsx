import React from "react";
import { useState } from "react";
import axios from "axios";
const Createcomment = ({ postId }) => {
  const [content, setContent] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:4001/posts/${postId}/comments`,
        {
          content,
        },
      );
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Add Comment</label>
        <input
          type="text"
          placeholder="Add comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Createcomment;
