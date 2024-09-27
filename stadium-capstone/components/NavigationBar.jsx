import { Link } from "react-router-dom";

export default function NavigationBar({ token, loginSeen, setLoginSeen, administrator }) {
  // console.log(token);
  
  
  return (
    <nav className="navbar-container">
      {token ? (
        <div className="navbar-items">
          <Link to="/">BALLPARKS</Link>
          <Link to="/users/logout">LOGOUT</Link>
          <Link to="/users/me">ACCOUNT</Link>
          {administrator && <Link to="/admin">Admin</Link>}
          <Link to="/contactform">CONTACT US</Link>
        </div>
      ) : (
        <div className="navbar-items">
          <Link to="/">BALLPARKS</Link>
          <Link onClick={() => setLoginSeen(!loginSeen)}>LOG IN</Link>
          <Link to="/users/register">REGISTER</Link>
          <Link to="/contactform">CONTACT US</Link>
        </div>
      )}
    </nav>
  );
}
