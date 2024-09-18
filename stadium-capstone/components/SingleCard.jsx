import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SingleCard ({ token, userId }) {
    const [stadium, setStadium] = useState({});
    const [success, setSuccess] = useState("");
    const [reviews, setReviews] = useState([]); 
    let { id } = useParams();
  console.log(userId);
  
    useEffect(() => {
      async function getToken() {
        console.log(userId);
        try {
          const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const result = await response.json();
          console.log(result);
          
        } catch (error) {
          console.error(error);
        }   console.log(token);
      }
      getToken();
      // console.log(id);

      async function getStadium() {
        try {

          const response = await fetch(`http://localhost:3000/api/stadiums/${id}`,{
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
          });
          const result = await response.json();

          if (Array.isArray(result.reviews)) {
            const reviewIds = result.reviews.map(review => review.id);

            const reviewsWithComments = await Promise.all(
              reviewIds.map(async (reviewId) => {

                const reviewResponse = await fetch(`http://localhost:3000/api/reviews/${reviewId}`,{
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                  },
                });
                const reviewResult = await reviewResponse.json();
                return {
                  ...reviewResult
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
    }, [id]); 

    async function visited() {
      try {
        await fetch(`http://localhost:3000/api/users/${userId}/visitedstadiums/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ visited: true })
        });
        console.log(userId, id, stadium.name)
        setSuccess(`Visited ${stadium.name}!`);
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
                <div className="comments">
                  {review.comments.map((comment) => (
                    <p key={comment.id}>Reply: {comment.content}</p>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>

      </div>
      <br />
        </>
    );
}
