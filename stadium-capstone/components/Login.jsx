// import { URL } from "../API";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Login({
  setToken,
  username,
  setUsername,
  password,
  setPassword,
  setFirstName,
  userId,
  setUserId
}) {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(userId);
    
    
    try {
      const result = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const json = await result.json();
      const newId = json.user.id
      const name = json.user.firstName
      setToken(json.token);
      setUserId(newId)
      setFirstName(name)
      console.log(userId, name);
      // alert('You have successfully logged in!');
      // navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form id="login" onSubmit={handleSubmit}>
        <h2>Log-in</h2>
        <label>
          <input
            id="username-input"
            minLength="2"
            value={username}
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <input
            id="password-input"
            minLength="6"
            value={password}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
      <br />
    </>
  );
}
