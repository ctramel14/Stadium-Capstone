import { useState } from "react";
import ReviewItem from "./ReviewItem";
import { useNavigate } from "react-router-dom";

const Reviews = ({ reviews, setReviews, width, token }) => {
  const [editingReview, setEditingReview] = useState(null);
  const [reviewContent, setReviewContent] = useState({
    rating: "",
    comment: "",
  });
  const navigate = useNavigate();


  async function deleteReview(reviewId) {
    if (reviewId) {
      try {
        await fetch(`http://localhost:3000/api/reviews/${reviewId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setReviews((prev) => prev.filter((review) => review.id !== reviewId));
      } catch (error) {
        console.error(error);
      }
    }
  }
  async function editReview(e, reviewId) {
    e.preventDefault();
    if (reviewId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/review/${reviewId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              rating: parseInt(reviewContent.rating),
              comment: reviewContent.comment,
            }),
          }
        );
        const updatedReview = await response.json();
        setReviews((prev) =>
          prev.map((review) =>
            review.id === reviewId ? { ...review, ...updatedReview } : review
          )
        );
        setEditingReview(null);
        setReviewContent({ rating: "", comment: "" });
      } catch (error) {
        console.error(error);
      }
    }
  }
  return (
    <>
      <header className="section-header">
        <h3>Your Reviews</h3>
      </header>
      {reviews.length > 0 ? (
        <div className="table-wrapper">
          {width > 1000 ? (
            <table className="reviews-table">
              <thead>
                <tr className="table-headers">
                  <th>Ballpark</th>
                  <th>Team</th>
                  <th>Rating</th>
                  <th>Your Review</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {reviews.map((review) => (
                  <ReviewItem
                    key={review.id}
                    {...{
                      expanded: true,
                      editingReview,
                      review,
                      editReview,
                      setReviewContent,
                      reviewContent,
                      setEditingReview,
                      deleteReview,
                    }}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ color: "black" }} id="small-screen-table">
              {reviews.map((review) => (
                <ReviewItem
                  key={review.id}
                  {...{
                    editingReview,
                    review,
                    editReview,
                    setReviewContent,
                    reviewContent,
                    setEditingReview,
                    deleteReview,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <p id="nothingWarning">Go to any <span onClick={() => navigate("/")}>ballpark</span>  page to leave your first review!</p>
      )}
      <hr className="line-across-account"></hr>
    </>
  );
};

export default Reviews;
