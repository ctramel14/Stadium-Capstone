// import { URL } from "../API";
import { useNavigate } from "react-router-dom";

export default function Login({
  setToken,
  username,
  setUsername,
  password,
  setPassword,
}) {
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    console.log(password);
    
    try {
      const result = await fetch(`http://localhost:3000/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const json = await result.json();
      console.log(json);
      setToken(json.token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form id="login" onSubmit={handleSubmit}>
        <h2>Log-in</h2>
        <label>
          <input
            id="username-input"
            minLength="2"
            value={username}
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <input
            id="password-input"
            minLength="6"
            value={password}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
      <br />
    </>
  );
}
