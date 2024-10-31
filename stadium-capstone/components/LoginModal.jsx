import "./LoginModal.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
const apiUrl = "https://stadium-capstone.onrender.com"

const LoginModal = ({
  setToken,
  username,
  setUsername,
  password,
  setPassword,
  setFirstName,
  setUserId,
  setLoginSeen,
  loginSeen,
  setAdministrator,
  setGoogleId,
  setUser,
  profile,
  setProfile,
  setEmail,
  lastName,
  setLastName,
}) => {
  const [fail, setFail] = useState("");
//login method for googleusers, can also auto-register
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
//login function for non-google
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const json = await result.json();
      setToken(json.token);
      setUserId(json.user.id);
      setFirstName(json.user.firstName);
      setLastName(json.user.lastName);
      setAdministrator(json.user.administrator);
      setEmail(json.user.email);
      setLoginSeen(!loginSeen);
    } catch (error) {
      console.error(error);
      setFail("Username or Password invalid") 
    }
  }

  function validate(inputId) {
    const input = document.getElementById(inputId);
    const validityState = input.validity;
  
    if (validityState.patternMismatch) {
      input.setCustomValidity("Please use Google Login for Google Accounts");
    } else if (validityState.tooShort) {
      input.setCustomValidity("Username must be at least 4 characters");
    } else {
      input.setCustomValidity("");
    }
    input.reportValidity();
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        {!profile && (
          <>
            <p className="form-title">Sign in to your account</p>
            <div className="input-container">
              <input
                id="username-input"
                minLength="4"
                value={username}
                placeholder="Username"
                required pattern="[a-zA-Z0-9]+"
                onInvalid={() => validate("username-input")}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  ></path>
                </svg>
              </span>
            </div>
            <div className="input-container">
              <input
                id="password-input"
                minLength="6"
                value={password}
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {{fail} && <h4 style={{ color: "red" }} className="login-fail">{fail}</h4>}
            <button className="submit" type="submit">
              Sign in
            </button>
          </>
        )}
        <div>
          <br />
          {profile ? (
            <div>
              <img src={profile.picture} alt="user image" />
              <h3>User Logged in</h3>
              <p>Name: {profile.name}</p>
              <p>Email Address: {profile.email}</p>
              <br />
              <br />
            </div>
          ) : (
            <>
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
                Continue with Google
              </button>
            </>
          )}
        </div>
        {!profile && (
          <p className="signup-link">
            No account?&nbsp;
            <Link to="/users/register">Register</Link>
          </p>
        )}
        <div id="close">
          <button onClick={() => setLoginSeen(!loginSeen)}>Close</button>
        </div>
      </form>
    </>
  );
};

export default LoginModal;
