import React from "react";
import { useState } from "react";
import axios from "axios"
const Createpost = () => {
  const [title, setTitle] = useState("");
const handleSubmit= async(e)=>{
e.preventDefault()
try {
 const res=  await axios.post("http://localhost:4000/posts",{
  title
 })
 setTitle('')

}catch (error) {
}
}

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            type="text"
            value={title}
            placeholder="Create a post"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
       <button className="btn btn-primary">Submit</button>
      </form>
    </div> 
  );
};

export default Createpost;
