import { useNavigate } from "react-router-dom";

export default function Logout({
  setToken,
  googleLogout,
  profile,
  setProfile,
  setUserId,
}) {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setToken(null);
    setUserId(null);
    alert("You have successfully logged out!");
    navigate("/");
    //logout for if it's a google user
    if (profile) {
      googleLogout();
      setProfile(null);
    }
  }

  return (
    <>
      <div className="logOutPage">
        <div className="logOutMessage">
          <h1>Are you sure you want to leave?</h1>
          <p>You still have more ballparks to visit!</p>
          <button id="logOutButton" onClick={handleSubmit}>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}
