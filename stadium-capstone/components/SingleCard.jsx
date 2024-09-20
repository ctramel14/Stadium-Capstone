import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function SingleCard({ token, userId, username }) {
  const [stadium, setStadium] = useState({});
  const [success, setSuccess] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(null);
  let { id } = useParams();
  const navigate = useNavigate();

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
          console.log(reviewsWithComments);
        } else {
          setReviews([]);
        }

        setStadium(result);
      } catch (error) {
        console.error(error);
      }
    }
    getStadium();
  }, [id]);

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
            username: username,
          }),
        }
      );
      const result = await response.json();
      console.log(idInt, userId, rating, username);
      console.log(result);
      setReviewSuccess(true);
      console.log(reviewSuccess);
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
          <img src={stadium.imageInsideURL} className="singlestadium" /> <br />
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
                <div className="reviewuser">
                  {Object.keys(review.user).map((key, index) => (
                    <p key={index}>Review by: {review.user[key]}</p>
                  ))}
                  <p>Rating: {review.rating}/10</p>
                  <p>{review.comment}</p>
                </div>
                <button
                  onClick={() => navigate(`/stadiums/reviews/${review.id}`)}
                  type="submit"
                >
                  Reply
                </button>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
        {reviewSuccess ? (
          <div>
            <p>Review by {username}</p>
            <p>Rating: {rating}/10</p>
            <p>{comment}</p>
          </div>
        ) : (
          <h6></h6>
        )}
        {token && !reviewSuccess ? (
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
