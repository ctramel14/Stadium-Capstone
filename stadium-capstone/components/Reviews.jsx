import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Reviews({ token, userId, username }) {
  const [review, setReview] = useState("");
  const [reply, setReply] = useState("");
  const [comments, setComments] = useState([]);
  const [replySuccess, setReplySuccess] = useState("");
  const [commenters, setCommenters] = useState({});
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
        // console.log(result.comments);   //trying to make something happen to get usernames to appear next to comments
        const allUsers = result.comments;
        const nextUsers = allUsers.map((u) => u.user);
        const themUsers = nextUsers.map((u) => u.username)
        console.log(themUsers);
        
        setReview(result);
        setCommenters(themUsers);
        setComments(result.comments);
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
      <h2>
        {review.comment} {review.rating}/10
      </h2>
      <div className="comments">
        {comments.map((comment) => (
          <div key={comment.id}>
            <strong>{comment.user.username}</strong>: {comment.content}
          </div>
        ))}
      </div>
      {replySuccess && (
        <p>
          <strong>{username}</strong>: {replySuccess}
        </p>
      )}
      {token && !replySuccess ? (
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
      <button onClick={() => navigate(-1)}>Back</button>
    </>
  );
}
