import React from "react";
import EditReviewForm from "./EditReviewForm";

const ReviewItem = ({
  expanded = false,
  editingReview,
  review,
  editReview,
  setReviewContent,
  reviewContent,
  setEditingReview,
  deleteReview,
}) => {
  //props get passed to EditReviewForm
  return expanded ? (
    <tr>
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
          <td>
            <strong>{review.rating} / 10</strong>
          </td>
          <td>
            <strong>{review.comment}</strong>
          </td>
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
          <p>
            <strong>Ballpark: </strong>
            {review.stadium.name}
          </p>
          <p>
            <strong>Team Name: </strong>
            {review.stadium.teamName}
          </p>
          <p>
            <strong>Date Posted: </strong>
            {new Date(review.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Rating: </strong>
            {review.rating}/10
          </p>
          <p>
            <strong>Review: </strong>
            {review.comment}
          </p>
          <p>
            <strong>Image:</strong>
            <br />
            {review.imageURL ? (
              <img
                src={`${process.env.API_URL}${review.imageURL}`}
                alt="Review Image"
                style={{ width: "100px", height: "auto" }} // Adjust image size as needed
              />
            ) : (
              "No image posted"
            )}
          </p>
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
