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
          <td>{review.rating} / 10</td>
          <td>{review.comment}</td>
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
    <p key={review.id}>
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
          <div>stadium name: {review.stadium.name}</div>
          <div>{review.stadium.teamName}</div>
          <div>{review.rating} / 10</div>
          <div>{review.comment}</div>
          <div>{new Date(review.date).toLocaleDateString()}</div>
          <div>
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
    </p>
  );
};

export default ReviewItem;
