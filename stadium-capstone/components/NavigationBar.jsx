import { Link } from "react-router-dom";
import { useState } from "react";

export default function NavigationBar({
  token,
  setLoginSeen,
  administrator,
  width,
}) {
// state set to help with transition to smaller/mobile screens
  const [expand, setExpand] = useState(false);

  return (
    <nav
      className="navbar-container"
      style={{ height: expand ? "auto" : "44px" }}
    >
      {width <= 700 && (
        <div
          onClick={() => {
            setExpand((v) => !v);
            
          }}
          style={{
            color:'white',
            fontSize:'36px'
          }}
          id="burger-menu"
        >
          {expand ? "✕" : "☰"}
        </div>
      )}
      {(width > 700 ||
        expand) && (
          <>
            {token ? (
              <div className="navbar-items">
                <Link to="/" onClick={() => setExpand(false)}>BALLPARKS</Link>
                <Link to="/users/logout" onClick={() => setExpand(false)}>LOGOUT</Link>
                <Link to="/users/me" onClick={() => setExpand(false)}>ACCOUNT</Link>
                {administrator && <Link to="/admin">Admin</Link>}
                <Link to="/contactform" onClick={() => setExpand(false)}>CONTACT US</Link>
              </div>
            ) : (
              <div className="navbar-items">
                <Link to="/" onClick={() => setExpand(false)}>BALLPARKS</Link>
                <Link onClick={() => { setLoginSeen((v) => !v); setExpand(false); }}>LOG IN</Link>
                <Link to="/users/register" onClick={() => setExpand(false)}>REGISTER</Link>
                <Link to="/contactform" onClick={() => setExpand(false)}>CONTACT US</Link>
              </div>
            )}
          </>
        )}
    </nav>
  );
}
