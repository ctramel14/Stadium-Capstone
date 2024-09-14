import { Link } from "react-router-dom";

export default function NavigationBar({ token }) {
  
  return (
    <nav className="navbar" style={{ display: "flex", gap: "8px" }}>
      {token ? (
        <div>
          <Link to="/">Stadiums</Link>
          <Link to="/users/login">Login</Link>
          <Link to="/account">Account</Link>
          <Link to="/contactform" >Contact Us</Link>
        </div>
      ) : (
        <div>
          <Link to="/">Stadiums</Link>
          <Link to="/users/login">Login</Link>
          <Link to="/users/register">Register</Link>
          <Link to="/contactform" >Contact Us</Link>
        </div>
      )}
    </nav>
  );
}

