import { Link } from "react-router-dom";
import { useState } from "react";

export default function NavigationBar({
  token,
  loginSeen,
  setLoginSeen,
  administrator,
  width,
}) {
  // console.log(token);
  const [expand, setExpend] = useState(false);

  return (
    <nav
      className="navbar-container"
      style={{ height: expand ? "auto" : "44px" }}
    >
      {width <= 700 && (
        <div
          onClick={() => {
            setExpend((v) => !v);
          }}
          style={{
            color:'white',
            fontSize:'36px'
          }}
        >
          {expand ? "✕" : "☰"}
        </div>
      )}
      {(width > 700 ||
        expand) && (
          <>
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
          </>
        )}
    </nav>
  );
}
