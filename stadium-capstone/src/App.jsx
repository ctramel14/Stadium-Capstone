import { useState } from "react";
import "./App.css";
import StadiumCards from "../components/StadiumCards";
import SingleCard from "../components/SingleCard";
import NavigationBar from "../components/NavigationBar";
import { Route, Routes } from "react-router-dom";
// import Login from "../components/Login";
import Register from "../components/Register";
import ContactForm from "../components/ContactForm";
import Account from "../components/Account";
import LogOut from "../components/LogOut";
import Reviews from "../components/Reviews";

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

  return (
    <>
      <NavigationBar
        token={token}
        loginSeen={loginSeen}
        setLoginSeen={setLoginSeen}
      />
      {loginSeen ? (
        <LoginModal
          onClick={() => setLoginSeen(!loginSeen)}
          setToken={setToken}
          token={token}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          firstName={firstName}
          setFirstName={setFirstName}
          userId={userId}
          setUserId={setUserId}
          setLoginSeen={setLoginSeen}
          loginSeen={loginSeen}
        />
      ) : null}
      <NavigationBar token={token} />
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
              userId={userId}
              setUserId={setUserId}
            />
          }
        />
        <Route
          path="/users/me"
          element={
            <Account
              token={token}
              firstName={firstName}
              email={email}
              userId={userId}
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
        {/* <Route path="/users/logout" element={<LogOut setToken={setToken} />} /> */}
        {token && (
          <Route
            path="/users/logout"
            element={<LogOut setToken={setToken} />}
          />
        )}
      </Routes>
      {!token && <h4>Register or Log-in for full functionality!</h4>}
    </>
  );
}

export default App;
