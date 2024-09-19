import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SingleCard({ token, userId }) {
  const [stadium, setStadium] = useState({});
  const [success, setSuccess] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");
  const [replySuccess, setReplySuccess] = useState("");
  let { id } = useParams();
  // console.log(userId);

  useEffect(() => {
    async function getToken() {
      // console.log(userId);
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
    // console.log(id);

    async function getStadium() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/stadiums/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();

        if (Array.isArray(result.reviews)) {
          const reviewIds = result.reviews.map((review) => review.id);

          const reviewsWithComments = await Promise.all(
            reviewIds.map(async (reviewId) => {
              const reviewResponse = await fetch(
                `http://localhost:3000/api/reviews/${reviewId}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              const reviewResult = await reviewResponse.json();
              return {
                ...reviewResult,
              };
            })
          );

          setReviews(reviewsWithComments);
        } else {
          setReviews([]);
        }

        setStadium(result);
      } catch (error) {
        console.error(error);
      }
    }
    getStadium();
  }, [id], [reviews]);

  // visit a stadium

  async function visited() {
    try {
      await fetch(
        `http://localhost:3000/api/users/${userId}/visitedstadiums/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ visited: true }),
        }
      );
      console.log(userId, id, stadium.name);
      setSuccess(`Visited ${stadium.name}!`);
    } catch (error) {
      console.error(error);
    }
  }

  //posting a review
  
  async function sendReview(e) {
    e.preventDefault();

    const idInt = parseInt(id);

    try {
      const response = await fetch(
        `http://localhost:3000/api/stadium/${id}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating: parseInt(rating),
            comment: comment,
            date: new Date(),
            userId: userId,
            stadiumId: idInt,
          }),
        }
      );
      const result = await response.json();
      console.log(idInt, userId, rating);
      console.log(result);
      setReviewSuccess({
        // comment: comment,
        // userId: userId,
        // rating: parseInt(rating)        ignore this, i'm being dumb
      });
      console.log(reviewSuccess);
      
    } catch (error) {
      console.error(error);
    }
  }

  // posting a comment

  async function reviewComment(e) {
    e.preventDefault();
    const reviewId = reviews.map((review) => review.id);
    console.log(reviewId);

    try {
      const response = await fetch(
        `http://localhost:3000/api/reviews/${reviewId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: reply,
            userId: userId,
            reviewId: reviewId,
          }),
        }
      );
      const result = await response.json();
      console.log(reply, userId, reviewId);
      console.log(result);
      setReplySuccess(`${reply}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="single">
        <div className="stadiuminfo">
          <h4>{stadium.name}</h4>
          <h5>{stadium.teamname}</h5>
          <h6>{stadium.state}</h6>
          <img src={stadium.imageOutsideURL} className="singlestadium" /> <br />
        </div>
        {token ? (
          <button className="visited" onClick={() => visited(stadium.id)}>
            Select as Visited
          </button>
        ) : (
          <h4></h4>
        )}
        {success && <h4>{success}</h4>}

        <div className="reviews">
          {Array.isArray(reviews) && reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="review">
                <h5>Review by User {review.userId}</h5>
                <p>Rating: {review.rating}</p>
                <p>{review.comment}</p>
                {/* {reviewSuccess && <h6>{reviewSuccess}</h6>} */}
                <div className="comments">
                  {review.comments.map((comment) => (
                    <p key={comment.id}>Reply: {comment.content}</p>
                  ))}
                  {replySuccess && <p>Reply: {replySuccess}</p>}
                </div>
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
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
        {token ? (
          <form onSubmit={sendReview}>
            <label>Rating</label>
            <input
              id="rating"
              type="number"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
            <label>comment</label>
            <input
              id="comment"
              type="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <button type="submit">Send</button>
          </form>
        ) : (
          <h6></h6>
        )}
      </div>
      <br />
    </>
  );
}
