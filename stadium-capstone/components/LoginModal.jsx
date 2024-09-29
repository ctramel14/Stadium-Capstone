import "./LoginModal.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";


const LoginModal = ({
  toggleLogin,
  setToken,
  username,
  setUsername,
  password,
  setPassword,
  firstName,
  setFirstName,
  userId,
  setUserId,
  setLoginSeen,
  loginSeen,
  setAdministrator,
  googleId,
  setGoogleId,
  user,
  setUser,
  profile,
  setProfile,
  email,
  setEmail
}) => {
  const [lastName, setLastName] = useState("")
  
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse)
      if (codeResponse.access_token) {
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                headers: {
                    Authorization: `Bearer ${codeResponse.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                setProfile(res.data);
                setFirstName(res.data.given_name)
                setLastName(res.data.family_name)
                setUsername(res.data.email)
                setEmail(res.data.email)
                setGoogleId(res.data.id);          
           fetch("http://localhost:3000/register", {
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
                })
              
                .then((rest) => {     
                  rest.json().then((json) => {
                    const newUserId = json.newUser;
                    
                    if (json.error == "Username already exists") {
                      fetch(`http://localhost:3000/login`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ 
                          username: res.data.email, 
                          password, 
                          googleId: res.data.id, 
                        }),
                      })
                      .then((result) => {
                        result.json().then((json) => {              
                          setToken(json.token);
                          const newId = json.user.id;
                          setUserId(newId);
                          const admin = json.user.administrator;
                          setAdministrator(admin);
                        })
                      })  
                    }
                    setUserId(newUserId.id);
                    setToken(json.token);
                  })
                }) 
              })
            // .catch((err) => console.log("poo poo magoo"))
              }
    },
    onError: (error) => console.log('Login Failed:', error)
});

const logOut = () => {
  googleLogout();
  setProfile(null);
};

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
      const admin = json.user.administrator;
      setToken(json.token);
      setUserId(newId);
      setFirstName(name);
      setAdministrator(admin);
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
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div>
        <p className="signup-link">
          No account?
          <Link to="/users/register">Register</Link>
        </p>
        <div id="close">
        <button onClick={() => setLoginSeen(!loginSeen)}>
          Close
        </button>
        </div>
      </form>
    </>
  );
};

export default LoginModal;
