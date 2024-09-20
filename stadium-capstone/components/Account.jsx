import { useState, useEffect } from "react";

export default function Account({ token, email, firstName, userId }) {
  const [visited, setVisited] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [editingReview, setEditingReview] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [reviewContent, setReviewContent] = useState({ rating: '', comment: '' });
  const [commentContent, setCommentContent] = useState('');
  const message = `Please log in to see your account details.`;
  const noStadium = `No stadiums visited yet`;

  useEffect(() => {
    if (!token || !userId) return;

    async function fetchUserData() {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        setVisited(result.visitedStadiums.map((v) => v.stadium));
        setReviews(result.reviews);
        setComments(result.comments);
        setUsername(result.username);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserData();
  }, [token, userId]);

  async function deleteVisitedStadium(stadiumId) {
    try {
      await fetch(`http://localhost:3000/api/user/${userId}/visitedstadium/${stadiumId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setVisited((prev) => prev.filter((stadium) => stadium.id !== stadiumId));
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteReview(reviewId) {
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

  async function deleteComment(commentId) {
    try {
      await fetch(`http://localhost:3000/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error(error);
    }
  }

  async function editReview(e, reviewId) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/review/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: reviewContent.rating,
          comment: reviewContent.comment
        }),
      });
      const updatedReview = await response.json();
      setReviews((prev) => prev.map((review) => (review.id === reviewId ? updatedReview : review)));
      setEditingReview(null);
      setReviewContent({ rating: '', comment: '' });
    } catch (error) {
      console.error(error);
    }
  }

  async function editComment(e, commentId) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/comment/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: commentContent }),
      });
      const updatedComment = await response.json();
      setComments((prev) => prev.map((comment) => (comment.id === commentId ? updatedComment : comment)));
      setEditingComment(null);
      setCommentContent('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {!token ? (
        <h3 className="message">{message}</h3>
      ) : (
        <div>
          <h2>Welcome, {firstName}!</h2>
          <h3>Username: {username}</h3>

          <h4>Your Reviews:</h4>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="user-review">
                {editingReview === review.id ? (
                  <form onSubmit={(e) => editReview(e, review.id)}>
                    <label>
                      Rating:
                      <input
                        type="number"
                        value={reviewContent.rating}
                        onChange={(e) => setReviewContent({ ...reviewContent, rating: e.target.value })}
                      />
                    </label>
                    <label>
                      Review:
                      <textarea
                        value={reviewContent.comment}
                        onChange={(e) => setReviewContent({ ...reviewContent, comment: e.target.value })}
                      />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditingReview(null)}>Cancel</button>
                  </form>
                ) : (
                  <>
                    <p>Stadium: {review.stadium.name}</p>
                    <p>Rating: {review.rating}</p>
                    <p>Review: {review.comment}</p>
                    <p>Date: {new Date(review.date).toLocaleDateString()}</p>
                    <button onClick={() => {
                      setEditingReview(review.id);
                      setReviewContent({ rating: review.rating, comment: review.comment });
                    }}>Edit Review</button>
                    <button onClick={() => deleteReview(review.id)}>Delete Review</button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No reviews written yet.</p>
          )}

          <h4>Your Replies:</h4>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="user-comment">
                {editingComment === comment.id ? (
                  <form onSubmit={(e) => editComment(e, comment.id)}>
                    <label>
                      Reply:
                      <textarea
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                      />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditingComment(null)}>Cancel</button>
                  </form>
                ) : (
                  <>
                    <p>
                      Stadium: {comment.review.stadium.name}
                    </p>
                    <p>Reply: {comment.content}</p>
                    <p>Date: {new Date(comment.date).toLocaleDateString()}</p>
                    <button onClick={() => {
                      setEditingComment(comment.id);
                      setCommentContent(comment.content);
                    }}>Edit Reply</button>
                    <button onClick={() => deleteComment(comment.id)}>Delete Reply</button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No replies written yet.</p>
          )}

          <h4>Your Visited Stadiums:</h4>
          {visited.length > 0 ? (
            <div>
              {visited.map((stadium) => (
                <div key={stadium.id} className="visited-stadium">
                  <img src={stadium.imageOutsideURL} alt={stadium.name} />
                  <p>{stadium.name}</p>
                  <button onClick={() => deleteVisitedStadium(stadium.id)}>
                    Remove from Visited
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>{noStadium}</p>
          )}
        </div>
      )}
    </>
  );
}
