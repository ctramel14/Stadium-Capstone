import "./LoginModal.css";
import { useState, useEffect } from "react";

const LoginModal = ({
  toggleLogin,
  setToken,
  username,
  setUsername,
  password,
  setPassword,
  setFirstName,
  userId,
  setUserId,
  setLoginSeen,
  loginSeen,
}) => {
  async function handleSubmit(e) {
    e.preventDefault();
    setLoginSeen(!loginSeen);

    try {
      const result = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const json = await result.json();
      const newId = json.user.id;
      const name = json.user.firstName;
      setToken(json.token);
      setUserId(newId);
      setFirstName(name);
      console.log(userId, name);
      // alert('You have successfully logged in!');
      // navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input
            id="username-input"
            minLength="2"
            value={username}
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <span>
            <svg
              // stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                //   stroke-width="2"
                //   stroke-linejoin="round"
                //   stroke-linecap="round"
              ></path>
            </svg>
          </span>
        </div>
        <div className="input-container">
          <input
            id="password-input"
            minLength="6"
            value={password}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <span>
            <svg
              // stroke="currentColor"
              viewBox="0 0 24 24"
              // fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                //   stroke-width="2"
                //   stroke-linejoin="round"
                //   stroke-linecap="round"
              ></path>
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                //   stroke-width="2"
                //   stroke-linejoin="round"
                //   stroke-linecap="round"
              ></path>
            </svg>
          </span>
        </div>
        <button className="submit" type="submit">
          Sign in
        </button>

        <p className="signup-link">
          No account?
          <a href="">Sign up</a>
        </p>
      </form>
      <button onClick={toggleLogin}>Close</button>
    </>
  );
};

export default LoginModal;
