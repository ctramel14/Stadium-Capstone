//register page, passing in props from App.jsx
import { useNavigate } from "react-router-dom";

export default function Register({
  setToken,
  email,
  setEmail,
  password,
  setPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  username,
  setUsername,
  userId,
  setUserId
}) {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(username, lastName, email, password, userId);
    
    try {
      const result = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName, username, userId }),
      });
      const json = await result.json();
      console.log(json);
      setToken(json.token);
      setUserId(json.id)
      console.log(userId);
      
      // alert('You have successfully logged in!');
      // navigate("/users/login");
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
            id="firstname-input"
            minLength="2"
            value={firstName}
            placeholder="First name"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          <input
            id="lastname-input"
            minLength="2"
            value={lastName}
            placeholder="Last name"
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
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
