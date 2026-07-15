import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();

const PORT = 4003;
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data} = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    await axios.post("http://localhost:4005/events", {
      type: 'CommentModerated',

      data: {
        status,
        id: data.id,
        postId: data.postId,
        content: data.content,
      },
    });
  }
  res.send({})
});

app.listen(PORT, () => {
  `console.log( running on ${PORT})`;
});
