import React,{FC} from "react";

const EditReviewForm= ({
  review,
  editReview,
  setReviewContent,
  reviewContent,
  setEditingReview,
}) => {
  return (
    <section className="edit-form-container">
      <form onSubmit={(e) => editReview(e, review.id)} className="edit-form">
        <h4>Edit Review</h4>
        <p>Ballpark: {review.stadium.name}</p>
        <label>
          Rating:
          <br />
          <input
            type="number"
            value={reviewContent.rating}
            max={10}
            min={0}
            onChange={(e) =>
              setReviewContent({
                ...reviewContent,
                rating: +e.target.value,
              })
            }
          />
        </label>
        <label>
          Review:
          <textarea
            value={reviewContent.comment}
            onChange={(e) =>
              setReviewContent({
                ...reviewContent,
                comment: e.target.value,
              })
            }
          />
        </label>
        <div className="edit-form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditingReview(null)}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditReviewForm;
