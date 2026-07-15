//any time any intersting new post or comment happens make sure we make new request to event bus then event bus will take event to all other bus then other services can listen to this end points
import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
const app = express();
const PORT = 4005;

app.use(bodyParser.json());


// app.post("/events", (req, res) => {
//   const event = req.body;

//   axios.post("http://localhost:4000/events", event);
//   axios.post("http://localhost:4001/events", event);
//   axios.post("http://localhost:4002/events", event);
//   res.send({ status: "ok" });
// });
app.post("/events", async (req, res) => {
  const event = req.body;

  console.log("Received:", event.type);

  try {
    await axios.post("http://localhost:4000/events", event);
    await axios.post("http://localhost:4001/events", event);
    await axios.post("http://localhost:4002/events", event);
    await axios.post("http://localhost:4003/events", event);
  } catch (err) {
    console.log("Forwarding error:", err.message);
  }

  res.send({});
});

app.listen(4005, () => {
  console.log(`Listening on ${PORT}`);
});
