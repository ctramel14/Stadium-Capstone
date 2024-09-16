// import { URL } from "../API";
import { useNavigate } from "react-router-dom";

export default function Login({
  setToken,
  email,
  setEmail,
  password,
  setPassword,
}) {
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await fetch(`http://localhost:3000/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await result.json();
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
            id="email-input"
            minLength="8"
            value={email}
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
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
