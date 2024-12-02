//register page, passing in props from App.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { apiUrl } from "../apiUrl";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

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
  setUserId,
  loginSeen,
  setLoginSeen,
  setGoogleId,
  setUser,
  profile,
  setProfile
}) {
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [fail, setFail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await fetch(`${apiUrl}/register`, {
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
      setToken(json.token);
      setUserId(json.newUser.id);
      setSuccess("Registration Successful");
    } catch (error) {
      console.error(error);
      setFail("Username or Email already exists. Please try again!")  
    }
  }

  function validate(inputId) {
    const input = document.getElementById(inputId);
    const validityState = input.validity;
  
    if (validityState.patternMismatch) {
      input.setCustomValidity("Special characters not allowed");
    } else if (validityState.tooShort) {
      input.setCustomValidity("Inputted name is too short");
    } else {
      input.setCustomValidity("");
    }
    input.reportValidity();
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      if (codeResponse.access_token) {
        axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${codeResponse.access_token}`,
                Accept: "application/json",
              },
            }
          )
          .then((res) => {
            setProfile(res.data);
            setFirstName(res.data.given_name);
            setLastName(res.data.family_name);
            setUsername(res.data.email);
            setEmail(res.data.email);
            setGoogleId(res.data.id);
            fetch(`${apiUrl}/register`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: res.data.email,
                password,
                firstName: res.data.given_name,
                lastName: res.data.family_name,
                username: res.data.email,
                googleId: res.data.id,
              }),
            }).then((rest) => {
              rest.json().then((json) => {
                const newUserId = json.newUser;
//pushes forward to login if user is registered
                if (codeResponse.access_token) {
                  fetch(`${apiUrl}/login`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      email: res.data.email,
                      googleId: res.data.id,
                    }),
                  }).then((result) => {
                    result.json().then((json) => {
                      setToken(json.token);
                      setUserId(json.user.id);
                      setUsername(json.user.username)
                      setAdministrator(json.user.administrator);
                    });
                  });
                }
                setUserId(newUserId.id);
                setToken(json.token);
              });
            });
          });
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

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
                  placeholder="First Name"
                  required pattern="[A-Za-z]+"
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
                  placeholder="Last Name"
                  required pattern="[A-Za-z]+"
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
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>Email</span>
            </label>

            <label>
              <input
                id="username-input"
                className="input"
                type="text"
                minLength="4"
                value={username}
                placeholder="Username"
                required
                onInvalid={() => validate("username-input")}
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
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>Password</span>
            </label>
            {{fail} && <h3 style={{ color: "red" }} className="register-fail">{fail}</h3>}
            <button className="submit" type="submit">
              Submit
            </button>
            <button
                className="oauthButton"
                id="oauthButton"
                onClick={() => login()}
              >
                <svg className="icon" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  ></path>
                  <path d="M1 1h22v22H1z" fill="none"></path>
                </svg>
                Register with Google
              </button>
            <p className="signin">
              Already have an account?{" "}
              <span onClick={() => setLoginSeen(!loginSeen)} id="sign-in-login">
                Log in
              </span>
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
