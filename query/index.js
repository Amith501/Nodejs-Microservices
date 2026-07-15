// import express from 'express';
// import bodyParser from 'body-parser'
// import cors from 'cors'
// const app= express();
// const PORT= 4002
// const posts= {}
// app.use(bodyParser.json())
// app.use(cors())

// app.get('/posts',(req,res)=>{
// res.send(posts)
// })

// app.post('/events',(req,res)=>{
//     const{type,data}= req.body;

//     if(type ==='PostCreated'){
//         const{id,title}= data;

// posts[id]= {id,title,comments:[]}
//     }
//      if(type ==='CommentCreated'){
//         const {id,content,postId}= data;
//         const post= posts[postId]
//         post.comments.push({id,content})

//     }
//     console.log(posts)

//     res.send({})
// })

// app.listen(4002,()=>{
// console.log(`listening on ${PORT}`)
// })

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 4002;

const posts = {};

app.use(bodyParser.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (type === "CommentCreated") {
    const { id, content, postId,status } = data;

    const post = posts[postId];

    if (post) {
      post.comments.push({
        id,
        content,
        status
      });
    }
  }
if(type === "Commentupdated"){
  const {id,postId,status,content}= data;
  const post= posts[postId];
  const comment= post.find(comment=>{
    return comment.id ===id;
  })
  comment.status= status;
  comment.content= content;
}
  console.log(posts,"posts");

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
