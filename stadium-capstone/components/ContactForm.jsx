import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const result = await fetch("http://localhost:3000/api/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name: name, email: email, message: message }),
      });
      setSubmitted(true);
      const json = await result.json();
      console.log(json.name);
    } catch (error) {
      console.error();
    }
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (submitted) {
    return <p>We've received your message, thank you for contacting us!</p>;
  }

  return (
    <form onSubmit={submit}>
      <label>Name</label>
      <input
        id="name"
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Message</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button type="submit">Send</button>
    </form>
  );
}
