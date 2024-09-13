// import { URL } from "../API";

export default function Register({
  setToken,
  email,
  setEmail,
  password,
  setPassword,
}) {
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await fetch(`/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await result.json();
      setToken(json.token);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form id="register" onSubmit={handleSubmit}>
        <h2>Register</h2>
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
    </>
  );
}
