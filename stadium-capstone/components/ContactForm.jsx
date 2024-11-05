import { useState } from "react";
import "./ContactForm.css";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../apiUrl";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  //post request to send messages to admin
  async function submit(e) {
    e.preventDefault();

    try {
      const result = await fetch(`${apiUrl}/api/contactus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name: name, email: email, message: message }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  }
  if (error) {
    return <p>{error}</p>;
  }
  //message for if sending is a success
  if (submitted) {
    return (
      <div id="contactPage">
        <div id="contact-success-message">
          <p>We've received your message, thank you for contacting us!</p>
          <p>We'll get back to you as soon as we can.</p>
          <div>
            <button id="submit" onClick={() => navigate("/")}>
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="contactForm">
      <h1>Contact Us</h1>
      <p>Have a question or comment? Send us a message!</p>
      <p>We'll get back to you as soon as we can.</p>
      <form onSubmit={submit}>
        <div id="contact">
          <label>Name: </label>
          <input
            id="name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email: </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Message: </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button id="submit" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
