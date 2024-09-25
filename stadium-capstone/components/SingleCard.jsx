import { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


import "./SingleCard.css";

export default function SingleCard({ token, userId, username }) {
  const [stadium, setStadium] = useState({});
  const [success, setSuccess] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(null);
  const [reviewId, setReviewId] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [restaurant, setRestaurant] = useState([]);
  const [hotel, setHotel] = useState([]);
  
  let { id } = useParams();
  const navigate = useNavigate();

  const stadiumColors = {
    1: "rgb(156,41,59)",
    2: "rgb(27,57,99)",
    3: "rgb(233,124,77)",
    4: "rgb(189,48,57)",
    5: "rgb(40,67,138)",
    6: "rgb(0,0,0)",
    7: "rgb(195,56,55)",
    8: "rgb(33,53,77)",
    9: "rgb(65,22,122)",
    10: "rgb(22,46,81)",
    11: "rgb(227,131,72)",
    12: "rgb(41,86,147)",
    13: "rgb(184,53,57)",
    14: "rgb(49,105,163)",
    15: "rgb(80,171,223)",
    16: "rgb(33,53,88)",
    17: "rgb(28,59,103)",
    18: "rgb(236,101,48)",
    19: "rgb(40,54,87)",
    20: "rgb(41,130,75)",
    21: "rgb(216,70,67)",
    22: "rgb(249,204,92)",
    23: "rgb(63,54,48)",
    24: "rgb(240,135,64)",
    25: "rgb(50,107,108)",
    26: "rgb(206,65,89)",
    27: "rgb(36,62,105)",
    28: "rgb(31,64,131)",
    29: "rgb(51,90,150)",
    30: "rgb(172,50,38)",
  };

  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    console.log("Effect has been run");
  }, []);

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

    async function getRestaurants() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/stadiums/${id}/restaurants`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        console.log(result.restaurant);
        setRestaurant(result.restaurant)
        
      } catch (error) {
        console.error(error);
      }
    } getRestaurants();

    async function getHotels() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/stadiums/${id}/hotels`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        console.log(result.hotel);
        setHotel(result.hotel)
        
      } catch (error) {
        console.error(error);
      }
    } getHotels();
    

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
        console.log(result);
        
        setReviewId(result.reviews.map((review) => review.userId));

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
      setSuccess(`Added ${stadium.name} to your visited stadiums!`);
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
      setShowInput(showInput);
      setReviewSuccess(true);
      console.log(reviewSuccess);
    } catch (error) {
      console.error(error);
    }
  }
  function numberWithCommas(x) {
    if (typeof x !== "number") {
      return;
    }
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  }
  
  const handleClick = () => {
    setShowInput(!showInput);
  };

  return (
    <>
      <div className="stadium-info-page">
        <div className="stadiumDetails">
          <h2>{stadium.name}</h2>
          <h3>{stadium.teamName}</h3>
          <div
            className="singleStadium-card-image"
            style={{ backgroundColor: stadiumColors[stadium.id] }}
          >
            <img src={stadium.imageInsideURL} className="insideStadium-image" />
          </div>
          <div className="stadium-facts">
            <p>Opened in {stadium.openYear}</p>|
            <p>Capacity: {numberWithCommas(stadium.capacity)}</p>|
            <p>Division: {stadium.division}</p>|
            <p>
              Address: {stadium.address}, {stadium.city}, {stadium.state},{" "}
              {stadium.zipCode}{" "}
            </p>
          </div>
          
          {token && (
            <div className="single-page-buttons">
              <button onClick={() => visited(stadium.id)}>
                Select as Visited
              </button>
              {!reviewId.includes(userId) && !reviewSuccess &&
              <button onClick={handleClick} >
              {showInput ? "Hide Input" : "Write Review"}
                </button>}
                {showInput && !reviewId.includes(userId) && !reviewSuccess &&
                (<form className="review-form" onSubmit={sendReview}>
              <label>Rating</label>
              <input
                id="rating"
                type="number"
                max="10"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />
              <label>Review</label>
              <input
                id="comment"
                type="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <button type="submit">Send</button>
            </form>) 
            }
            </div>
          )}
        </div>
        {success && (
          <div className="visited-success-message">
            <h4>{success}</h4>
            <div id="successButton">
              <button onClick={() => setSuccess("")}>Clear</button>
            </div>
          </div>
        )}
        <div className="restaurantsNearby">
          <h4>Restaurants near the stadium</h4>
        {restaurant.map((rest) => 
        <div className="restaurant-card" key={rest.id} >
          <h5>{rest.name}</h5>
          <h6>{rest.address}</h6>
          <h6>{rest.cuisine}</h6>
        </div>
        )}
        </div>
        <div className="hotelsNearby">
          <h4>Hotels</h4>
          {hotel.map((hot) => 
        <div className="restaurant-card" key={hot.id} >
          <h5>{hot.name}</h5>
          <h6>{hot.address}</h6>
          <h6>{hot.zipCode}</h6>
        </div>
        )}
        </div>

        <div className="reviews">
          {Array.isArray(reviews) && reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="review">
                <div className="reviewuser">
                  {Object.keys(review.user).map((key, index) => (
                    <p key={index}>Review by: {review.user[key]}</p>
                  ))}
                  <p>Rating: {review.rating}/10</p>
                  <p>"{review.comment}"</p>
                </div>
                <button
                  onClick={() => navigate(`/stadiums/reviews/${review.id}`)}
                  type="submit"
                >
                  Reply
                </button>
              </div>
            ))
          ) : ( <p>No reviews available.</p>
          )}
        </div>
        {reviewSuccess && (
          <div className="individualReviews">
            <p>Review by {username}</p>
            <p>Rating: {rating}/10</p>
            <p>{comment}</p>
          </div>
        )}
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </>
  );
}
