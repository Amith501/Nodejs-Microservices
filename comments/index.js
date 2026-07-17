import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
const app = express();
const PORT = 4001;

app.use(bodyParser.json());
app.use(cors());
const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// app.post("/posts/:id/comments", async (req, res) => {
//   const commentId = randomBytes(4).toString("hex");
//   const { content } = req.body;
//   const comments = commentsByPostId[req.params.id] || [];
//   comments.push({ id: commentId, content });
//   commentsByPostId[req.params.id] = comments;
//   await axios.post('http://localhost:4005/events', {
//     type: "CommentCreated",
//     data: {
//       id: commentId,
//       content,
//       postId: req.params.id,
//     },
//   });
//   res.status(201).send(comments);
// });

app.post("/posts/:id/comments", async (req, res) => {
  console.log("Comment endpoint hit");

  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[req.params.id] = comments;

  console.log("Sending event...");

  try {
    await axios.post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId: req.params.id,
        status: "pending",
      },
    });

    console.log("Event sent successfully");
  } catch (err) {
    console.log("ERROR:", err.message);
  }

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Event Recieved:", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { status, id, postId, content } = data;
    const comments = commentsByPostId[postId];
    const comment = await comments.find((comm) => {
      return comm.id === id;
    });
    comment.status = status;

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        status,
        content,
      },
    });
  }
  res.send({});
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
