import { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SingleCard.css";
//pulling states from main
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
  //colors for stadiums alphabetically by team name
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
  //for re-rendering after layout changes
  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    console.log("Effect has been run");
  }, []);
  //to check for a token to display based on whether user is logged in or not
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
      } catch (error) {
        console.error(error);
      }
    }
    getToken();
    //fetch restaurants to display based on stadium
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
        setRestaurant(result.restaurant);
      } catch (error) {
        console.error(error);
      }
    }
    getRestaurants();
    //fetch hotels to display based on stadium
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
        setHotel(result.hotel);
      } catch (error) {
        console.error(error);
      }
    }
    getHotels();
    //fetch stadium that user is on
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
        setReviewId(result.reviews.map((review) => review.userId));
        //utilizing userId on a review to go to the appropriate page to reply to
        if (Array.isArray(result.reviews)) {
          const reviewIds = result.reviews.map((review) => review.id);
          //fetch request to display reviews
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
          setReviews([]); //setting reviews state based on replies or not
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
      setSuccess(`Added ${stadium.name} to your visited stadiums!`); //setting message to display when clicking visited
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
      setShowInput(showInput); //changing states for conditional rendering in return
      setReviewSuccess(true);
    } catch (error) {
      console.error(error);
    }
  }
  //for displaying stadium capacity
  function numberWithCommas(x) {
    if (typeof x !== "number") {
      return;
    }
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  }
  //click handler for conditional rendering
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

          {token && ( //token check to display next information
            <div className="single-page-buttons">
              <button onClick={() => visited(stadium.id)}>
                Select as Visited
              </button>
              {!reviewId.includes(userId) && !reviewSuccess && ( //does not render button if user has posted previously, removes button if posted while on page
                <button onClick={handleClick}>
                  {showInput ? "Hide Input" : "Write Review"}
                </button>
              )}
              {showInput && !reviewId.includes(userId) && !reviewSuccess && ( //shows review form if user hasn't posted previously
                <form className="review-form" onSubmit={sendReview}>
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
                </form>
              )}
            </div>
          )}
        </div>
        {success && ( //visited stadium success message
          <div className="visited-success-message">
            <h4>{success}</h4>
            <div id="successButton">
              <button onClick={() => setSuccess("")}>Clear</button>
            </div>
          </div>
        )}
        <header className="nearby-list-header">
          <h3>Restaurants Near The Stadium</h3>
        </header>
        <div className="nearby-container">
          {restaurant.map((rest) => (
            <div className="nearby-card" key={rest.id} style={{ borderColor: stadiumColors[stadium.id] }}>
              <p><strong>{rest.name}</strong></p>
              <p>{rest.cuisine}</p>
              <p>{rest.address} <br/> 
                {rest.city}, {rest.state}, {rest.zipCode}</p>
            </div>
          ))}
        </div>
        <hr className="line-across"></hr>
        <header className="nearby-list-header">
          <h3>Hotels Near The Stadium</h3>
        </header>
        <div className="nearby-container">
          {hotel.map((hot) => (
            <div className="nearby-card" key={hot.id}>
              <p><strong>Hotel: {hot.name}</strong></p>
              <p>Address: {hot.address}</p>
              <p>Zip-code: {hot.zipCode}</p>
            </div>
          ))}
        </div>
        <hr className="line-across"></hr>
        <div className="reviews">
        {!reviews.length > 0 && !reviewSuccess && (
              <p>No reviews available.</p>
            )}
          {Array.isArray(reviews) && reviews.length > 0 && (
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
          )} 
        </div>
        {reviewSuccess && ( //display new review
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
