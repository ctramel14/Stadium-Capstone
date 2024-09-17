import { Link } from "react-router-dom";

export default function NavigationBar({ token }) {
  // console.log(token);
  
  
  return (
    <nav className="navbar" style={{ display: "flex", gap: "8px" }}>
      {token ? (
        <div>
          <Link to="/">Stadiums</Link>
          <Link to="/users/logout">LogOut</Link>
          <Link to="/users/me">Account</Link>
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

