import { Link } from "react-router-dom";

export default function NavigationBar({ token, loginSeen, setLoginSeen, administrator }) {
  // console.log(token);
  
  
  return (
    <nav className="navbar-container">
      {token ? (
        <div className="navbar-items">
          <Link to="/">Stadiums</Link>
          <Link to="/users/logout">LogOut</Link>
          <Link to="/users/me">Account</Link>
          {administrator && <Link to="/admin">Admin</Link>}
          <Link to="/contactform">Contact Us</Link>
        </div>
      ) : (
        <div className="navbar-items">
          <Link to="/">Stadiums</Link>
          <Link onClick={() => setLoginSeen(!loginSeen)}>Login</Link>
          <Link to="/users/register">Register</Link>
          <Link to="/contactform">Contact Us</Link>
        </div>
      )}
    </nav>
  );
}
