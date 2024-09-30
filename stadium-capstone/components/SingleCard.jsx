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
  const [stadiumsVisited, setStadiumsVisited] = useState([]);
  const [stadiumSuccess, setStadiumSuccess] = useState("");
  const [averageRating, setAverageRating] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalRatings, setTotalRatings] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

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
  //for re-rendering after button click
  useLayoutEffect(() => {
    if (buttonClicked) {
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
      console.log("Effect has been run");
      setButtonClicked(false); // Reset the state after the effect runs
    }
  }, [buttonClicked]);

  //to check for a token to display based on whether user is logged in or not
  useEffect(() => {
    async function getToken() {
      if (!token) return;
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
          setStadiumsVisited(
            result.visitedStadiums.map((stadium) => stadium.stadiumId)
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
          const ratingsMap = reviewsWithComments.map(
            (reviews) => reviews.rating
          );
          setTotalRatings(ratingsMap);
          let sum = 0;
          let avg = 0;
          for (let i = 0; i < totalRatings.length; i++) {
            sum += totalRatings[i];
            avg = sum / totalRatings.length;
          }
          setAverageRating(Math.round(avg * 10) / 10);
        } else {
          setReviews([]); //setting reviews state based on replies or not
        }
        setStadium(result);
      } catch (error) {
        console.error(error);
      }
    }
    getStadium();
  }, [id, averageRating]);

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
      setButtonClicked(true);
      setStadiumSuccess(true);
    } catch (error) {
      console.error(error);
    }
  }

  // handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Store the actual file
      setPreviewImage(URL.createObjectURL(file)); // Create URL for preview
    }
  };

  //posting a review
  const sendReview = async (e) => {
    e.preventDefault();

    // Create a FormData object to include the image file
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    formData.append("userId", userId);
    if (selectedImage) {
      formData.append("image", selectedImage); // Append the image file
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/stadium/${stadium.id}/reviews`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Only include token in headers
          },
          body: formData, // Send FormData
        }
      );

      if (response.ok) {
        const result = await response.json();
        const newReview = { ...result.review, user: { username } };
        setReviews([...reviews, newReview]); // Add new review to the list
        setRating("");
        setComment("");
        setSelectedImage(null);
        setPreviewImage(null);
        totalRatings.push(result.rating);
        setTotalRatings([...totalRatings, result.rating]);
        let sum = 0;
        let avg = 0;
        for (let i = 0; i < totalRatings.length; i++) {
          sum += totalRatings[i];
          avg = sum / totalRatings.length;
        }
        setAverageRating(Math.round(avg * 10) / 10);

        setShowInput(showInput); //changing states for conditional rendering in return
        setReviewSuccess(true);
      } else {
        console.error("Failed to submit review:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

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
    setButtonClicked(true);
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
            <p>Opened in {stadium.openYear}</p>
            <div className="vl"></div>
            <p>Capacity: {numberWithCommas(stadium.capacity)}</p>
            <div className="vl"></div>
            <p>Division: {stadium.division}</p>
            <div className="vl"></div>
            <p>
              Address: {stadium.address}, {stadium.city}, {stadium.state},{" "}
              {stadium.zipCode}{" "}
            </p>
          </div>

          {token && ( //token check to display next information
            <div className="single-page-buttons">
              {!stadiumsVisited.includes(stadium.id) && !stadiumSuccess && (
                <button onClick={() => visited(stadium.id)} style={{ backgroundColor: stadiumColors[stadium.id] }}>
                  Mark as Visited
                </button>
              )}
              {!reviewId.includes(userId) &&
                !reviewSuccess && ( //does not render button if user has posted previously, removes button if posted while on page
                  <button onClick={handleClick} style={{ backgroundColor: stadiumColors[stadium.id] }}>
                    {showInput ? "Hide Input" : "Write Review"}
                  </button>
                )}
              {showInput &&
                !reviewId.includes(userId) &&
                !reviewSuccess && ( //shows review form if user hasn't posted previously
                  <form className="review-form" onSubmit={sendReview}>
                    <label>Rating</label>
                    <input
                      id="rating"
                      type="number"
                      max="10"
                      min="1"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      required
                    />
                    <div className="rating-scale">
                      <p> 1: Worst experience</p>
                      <p> 5: Average experience</p>
                      <p> 10: Best experience</p>
                    </div>
                    <label>Review</label>
                    <textarea
                      id="comment"
                      type="text"
                      value={comment}
                      maxLength={500}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />
                    <label>Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Selected Preview"
                        className="img-upload"
                      />
                    )}
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
        <div className="average-rating-container">
          <p>
            {stadium.name} Average Rating: {averageRating} / 10
          </p>
        </div>
        <hr className="line-across"></hr>
        <header className="nearby-list-header">
          <h3>Restaurants Near The Stadium</h3>
        </header>
        <div className="nearby-container">
          {restaurant.map((rest) => (
            <div
              className="nearby-card"
              key={rest.id}
              style={{ borderColor: stadiumColors[stadium.id] }}
            >
              <p>
                <strong>{rest.name}</strong>
              </p>
              <p>{rest.cuisine}</p>
              <p>
                {rest.address} <br />
                {rest.city}, {rest.state}, {rest.zipCode}
              </p>
            </div>
          ))}
        </div>
        <hr className="line-across"></hr>
        <header className="nearby-list-header">
          <h3>Hotels Near The Stadium</h3>
        </header>
        <div className="nearby-container">
          {hotel.map((hot) => (
            <div
              className="nearby-card"
              key={hot.id}
              style={{ borderColor: stadiumColors[stadium.id] }}
            >
              <p>
                <strong>{hot.name}</strong>
              </p>
              <p>
                {hot.address}
                <br />
                {hot.city}, {hot.state}, {hot.zipCode}
              </p>
            </div>
          ))}
        </div>
        <hr className="line-across"></hr>
        <header className="nearby-list-header">
          <h3>Reviews</h3>
        </header>
        <div className="reviews-container">
          {!reviews.length > 0 && !reviewSuccess && (
            <p>No reviews available.</p>
          )}
          {Array.isArray(reviews) &&
            reviews.length > 0 &&
            reviews.map((review) => (
              <div key={review.id} className="review">
                {/* Check if review.user is defined */}
                {review.user ? (
                  <p id="user-review-name">Review by: {review.user.username}</p>
                ) : (
                  <p id="user-review-name">Anonymous Review</p>
                )}
                <p>
                  {new Date(review.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>{review.rating} / 10</p>
                <p>{review.comment}</p>
                {/* Render the image if imageURL is available */}
                {review.imageURL && (
                  <div className="review-image-container">
                    <img
                      src={`http://localhost:3000${review.imageURL}`}
                      alt="Review Image"
                      className="review-image"
                    />
                  </div>
                )}
                <button
                  id="reply-button"
                  onClick={() => navigate(`/stadiums/reviews/${review.id}`)}
                  type="submit"
                  style={{ backgroundColor: stadiumColors[stadium.id] }}
                >
                  Reply
                </button>
              </div>
            ))}
        </div>
        <br />
        <br />
      </div>
      <div>
        <button id="back-button" onClick={() => navigate(-1)} >Back</button>
      </div>
    </>
  );
}
