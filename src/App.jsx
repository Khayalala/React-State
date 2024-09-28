import React, { useEffect, useState } from "react";
import "./components/app.css";
const baseURL = "http://localhost:3000/users";

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(baseURL, {
      method: "POST",

      body: JSON.stringify({
        name: name,
        email: email
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((newUser) => {
        setUsers((prevUsers)=>[...prevUsers, newUser]);
        setName("");
        setEmail("");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
        id="name"
        type="text"
        placeholder="Your name here..."
        value={name}
        onChange={(e)=>setName(e.target.value)}
         />
        <input 
        id="email"
        type="text" 
        placeholder="Your email address..."
        value={email}
        onChange={(e)=>setEmail(e.target.value)}/>
        <button>Submit</button>
      </form>

      <div className="displayUsers">
        {
          users.map((user)=>(
            <div key={user.id}>
              <h4>{user.name}</h4>
              <h5>{user.email}</h5>
            </div>
          ))
        }
      </div>
    </div>
  )
};

export default App;
