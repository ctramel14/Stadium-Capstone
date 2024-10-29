import { useState, useLayoutEffect } from "react";
import "./App.css";
import StadiumCards from "../components/StadiumCards";
import SingleCard from "../components/SingleCard";
import NavigationBar from "../components/NavigationBar";
import { Route, Routes, Link } from "react-router-dom";
import Register from "../components/Register";
import ContactForm from "../components/ContactForm";
import Account from "../components/Account";
import LogOut from "../components/LogOut";
import Reviews from "../components/Reviews";
import LoginModal from "../components/LoginModal";
import Admin from "../components/Admin";
import { googleLogout } from "@react-oauth/google";
import EmailForm from '../components/EmailForm';

//setting state here to make passing props between components easier
function App() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stadiums, setStadiums] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [loginSeen, setLoginSeen] = useState(false);
  const [administrator, setAdministrator] = useState(false);
  const [width, setWidth] = useState(300);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [googleId, setGoogleId] = useState("");

  useLayoutEffect(() => {
    if (window) {
      setWidth(window.innerWidth);
      window.addEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    }
  }, []);

  return (
    <>
      <NavigationBar
        token={token}
        setLoginSeen={setLoginSeen}
        administrator={administrator}
        width={width}
      />
      {loginSeen ? (
        <LoginModal
          onClick={() => setLoginSeen(!loginSeen)}
          setToken={setToken}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setFirstName={setFirstName}
          setUserId={setUserId}
          setLoginSeen={setLoginSeen}
          loginSeen={loginSeen}
          setAdministrator={setAdministrator}
          setGoogleId={setGoogleId}
          setUser={setUser}
          profile={profile}
          setProfile={setProfile}
          setEmail={setEmail}
          lastName={lastName}
          setLastName={setLastName}
        />
      ) : null}
      <Routes>
        <Route
          path="/"
          element={
            <StadiumCards
              stadiums={stadiums}
              setStadiums={setStadiums}
              token={token}
              userId={userId}
            />
          }
        />
        <Route
          path="/stadiums/:id"
          element={
            <SingleCard token={token} userId={userId} username={username} />
          }
        />
        <Route
          path="/users/register"
          element={
            <Register
              setToken={setToken}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              username={username}
              setUsername={setUsername}
              setUserId={setUserId}
              setLoginSeen={setLoginSeen}
              loginSeen={loginSeen}
            />
          }
        />
        <Route
          path="/users/me"
          element={
            <Account
              token={token}
              firstName={firstName}
              setFirstName={setFirstName}
              userId={userId}
              width={width}
              username={username}
              setUsername={setUsername}
              googleId={googleId}
              setGoogleId={setGoogleId}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
            />
          }
        />
        <Route path="/contactform" element={<ContactForm />} />
        <Route
          path="/stadiums/reviews/:id"
          element={
            <Reviews token={token} userId={userId} username={username} />
          }
        />
        {token && (
          <Route
            path="/users/logout"
            element={
              <LogOut
                setToken={setToken}
                googleLogout={googleLogout}
                profile={profile}
                setProfile={setProfile}
                setUserId={setUserId}
              />
            }
          />
        )}
        {administrator && (
          <Route path="/admin" element={<Admin token={token} />} />
        )}
      </Routes>
      
      {!token && (
        <h4 className="full-access-message">
          <Link to="/users/register" onClick={() => setExpand(false)}>
            Register&nbsp;
          </Link>{" "}
          Or{" "}
          <span onClick={() => setLoginSeen(!loginSeen)} id="sign-in-login">
          &nbsp;Log in&nbsp;
          </span>
          For Full Access!
        </h4>
      )}
      <EmailForm />
    </>
  );
}

export default App;
