//register page, passing in props from App.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register({
  setToken,
  email,
  setEmail,
  password,
  setPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  username,
  setUsername,
  userId,
  setUserId,
  loginSeen,
  setLoginSeen
}) {
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(username, lastName, email, password, userId);

    try {
      const result = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          username,
        }),
      });
      const json = await result.json();
      console.log(json.newUser);
      setToken(json.token);
      const newUserId = json.newUser;
      setUserId(newUserId.id);
      setSuccess("Registration Successful");
      console.log(userId);
      // alert('You have successfully logged in!');
      // navigate("/users/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {!success ? (
        /* From Uiverse.io by ammarsaa */
        <div className="registerContainer">
          <form id="form" onSubmit={handleSubmit}>
            <p className="title">Register </p>
            <p className="message">
              Sign-up now and get full access to our app!{" "}
            </p>
            <div className="flex">
              <label>
                <input
                  className="input"
                  type="text"
                  minLength="2"
                  value={firstName}
                  placeholder=""
                  required=""
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <span>First Name</span>
              </label>

              <label>
                <input
                  className="input"
                  type="text"
                  minLength="2"
                  value={lastName}
                  placeholder=""
                  required=""
                  onChange={(e) => setLastName(e.target.value)}
                />
                <span>Last Name</span>
              </label>
            </div>
            <label>
              <input
                className="input"
                type="email"
                minLength="8"
                value={email}
                placeholder=""
                required=""
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>Email</span>
            </label>

            <label>
              <input
                className="input"
                type="text"
                minLength="2"
                value={username}
                placeholder=""
                required=""
                onChange={(e) => setUsername(e.target.value)}
              />
              <span>Username</span>
            </label>

            <label>
              <input
                className="input"
                type="password"
                minLength="6"
                value={password}
                placeholder=""
                required=""
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>Password</span>
            </label>
            <button className="submit" type="submit">
              Submit
            </button>
            <p className="signin" >
              Already have an account? <span onClick={() => setLoginSeen(!loginSeen)} id="sign-in-login">LogIn</span>
            </p>
          </form>
        </div>
      ) : (
        <div className="registerSuccess">
          <p>{success}!</p>
          <button onClick={() => navigate("/users/me")}>Account</button>
        </div>
      )}
    </>
  );
}
