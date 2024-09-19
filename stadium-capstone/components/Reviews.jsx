import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Reviews({ token, userId }) {
  const [review, setReview] = useState("");
  const [reply, setReply] = useState("");
  const [replySuccess, setReplySuccess] = useState("");
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    async function getToken() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
      } catch (error) {
        console.error(error);
      }
    }
    getToken();
    async function getReviews() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/reviews/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        console.log(result.comment);
        setReview(result.comment);
        console.log(review);
      } catch (error) {
        console.error(error);
      }
    }
    getReviews();
  }, [id]);

  async function reviewComment(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/reviews/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: reply,
            userId: userId,
            reviewId: id,
          }),
        }
      );
      const result = await response.json();
      setReplySuccess(reply);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h2>{review}</h2>
      {token ? (
        <form onSubmit={reviewComment}>
          <label>Reply</label>
          <input
            id="reply"
            type="reply"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            required
          />
          <button type="submit">Send Reply</button>
        </form>
      ) : (
        <h6></h6>
      )}
      {replySuccess && <button onClick={() => navigate(-1)}>Go back</button>}
    </>
  );
}
