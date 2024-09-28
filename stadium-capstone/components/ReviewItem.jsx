import React from "react";
import EditReviewForm from "./EditReviewForm";

const ReviewItem= ({
  expanded = false,
  editingReview,
  review,
  editReview,
  setReviewContent,
  reviewContent,
  setEditingReview,
  deleteReview,
}) => {
  return expanded ? (
    <tr>
      {/* <div key={review.id} className="user-review"> */}
      {editingReview === review.id ? (
        <td colSpan={6}>
          <EditReviewForm
            {...{
              review,
              editReview,
              setReviewContent,
              reviewContent,
              setEditingReview,
            }}
          />
        </td>
      ) : (
        <>
          <td>{review.stadium.name}</td>
          <td>{review.stadium.teamName}</td>
          <td><strong>{review.rating} / 10</strong></td>
          <td><strong>{review.comment}</strong></td>
          <td>{new Date(review.date).toLocaleDateString()}</td>
          <td>
            <button
              onClick={() => {
                setEditingReview(review.id);
                setReviewContent({
                  rating: review.rating,
                  comment: review.comment,
                });
              }}
            >
              Edit
            </button>
            <button onClick={() => deleteReview(review.id)}>Delete</button>
          </td>
        </>
      )}
    </tr>
  ) : (
    <div key={review.id} id="small-screen-item">
      {editingReview === review.id ? (
        <EditReviewForm
          {...{
            review,
            editReview,
            setReviewContent,
            reviewContent,
            setEditingReview,
          }}
        />
      ) : (
        <>
          <p>Ballpark: {review.stadium.name}</p>
          <p>{review.stadium.teamName}</p>
          <p>{new Date(review.date).toLocaleDateString()}</p>
          <p>{review.rating}/10</p>
          <p>{review.comment}</p>
          <div id="small-screen-buttons">
            <button
              onClick={() => {
                setEditingReview(review.id);
                setReviewContent({
                  rating: review.rating,
                  comment: review.comment,
                });
              }}
            >
              Edit
            </button>
            <button onClick={() => deleteReview(review.id)}>Delete</button>
          </div>
        </>
      )}
      <hr className="line-across"></hr>
    </div>
  );
};

export default ReviewItem;
