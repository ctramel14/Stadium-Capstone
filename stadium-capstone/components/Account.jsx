import React, { useState, useEffect, useLayoutEffect,FC } from "react";
import ReviewsTable from './ReviewsTable'
import { useNavigate } from "react-router-dom";
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

const Account= ({ token, email, firstName, userId }) =>{
  const [visited, setVisited] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [editingComment, setEditingComment] = useState(null);

  const [commentContent, setCommentContent] = useState("");
  const message = `Please log in to see your account details.`;
  const noStadium = `No stadiums visited yet`;
  const navigate = useNavigate();

  const [width, setWidth] = useState(300);

  useLayoutEffect(() => {
    if (window) {
      setWidth(window.innerWidth);
      window.addEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    }
  }, []);

  useEffect(() => {
    if (!token || !userId) return;

    async function fetchUserData() {
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
      await fetch(
        `http://localhost:3000/api/user/${userId}/visitedstadium/${stadiumId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVisited((prev) => prev.filter((stadium) => stadium.id !== stadiumId));
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
        prev.map((review) => (review.id === reviewId ? updatedReview : review))
      );
      setEditingReview(null);
      setReviewContent({ rating: "", comment: "" });
    } catch (error) {
      console.error(error);
    }
  }

  async function editComment(e, commentId) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/comment/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: commentContent }),
        }
      );
      const updatedComment = await response.json();
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? { ...comment, ...updatedComment } : comment
        )
      );
      setEditingComment(null);
      setCommentContent("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {!token ? (
        <h3 className="message">{message}</h3>
      ) : (
        <div className="account-page-wrapper">
          <header className="section-header">
            <div className="accountWelcomeMessage">
            <h3>Welcome, {firstName}!</h3>
            <h4>Username: {username}</h4>
            </div>
            <h3>Your Visited Stadiums</h3>
          </header>
          {visited.length > 0 ? (
            <div className="visited-grid-container">
              {visited.map((stadium) => (
                <div
                  key={stadium.id}
                  className="visited-cards"
                  style={{ backgroundColor: stadiumColors[stadium.id] }}
                >
                  <img src={stadium.imageOutsideURL} alt={stadium.name} />
                  <strong>
                    <h2>{stadium.name}</h2>
                  </strong>
                  <p>{stadium.teamName}</p>
                  <button onClick={() => deleteVisitedStadium(stadium.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div id="noStadiumsButton">
            {/* <p>{noStadium}</p> */}
            <button  onClick={() => navigate("/")}>Add Stadiums</button>
            </div>
          )}
          <ReviewsTable {...{width,reviews, setReviews,token}}/>
          <header className="section-header">
            <h3>Your Replies</h3>
          </header>
          {comments.length > 0 ? (
            <div className="table-wrapper">
              <table className="comments-table">
                <thead>
                  <tr className="table-headers">
                    <th>Stadium</th>
                    <th>Reply</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {comments.map((comment) => (
                    <tr key={comment.id}>
                      {/* <div key={comment.id} className="user-comment"> */}
                      {editingComment === comment.id ? (
                        <td colSpan="4">
                          <section className="edit-form-container">
                            <form
                              onSubmit={(e) => editComment(e, comment.id)}
                              className="edit-form"
                            >
                              <h4>Edit Reply</h4>
                              <label>
                                Reply:
                                <textarea
                                  value={commentContent}
                                  onChange={(e) =>
                                    setCommentContent(e.target.value)
                                  }
                                />
                              </label>
                              <div className="edit-form-buttons">
                                <button type="submit">Save</button>
                                <button
                                  type="button"
                                  onClick={() => setEditingComment(null)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </section>
                        </td>
                      ) : (
                        <>
                          <td>{comment.review.stadium.name}</td>
                          <td>{comment.content}</td>
                          <td>{new Date(comment.date).toLocaleDateString()}</td>
                          <td>
                            <button
                              onClick={() => {
                                setEditingComment(comment.id);
                                setCommentContent(comment.content);
                              }}
                            >
                              Edit
                            </button>
                            <button onClick={() => deleteComment(comment.id)}>
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No replies written yet.</p>
          )}
        </div>
      )}
    </>
  );
}

export default Account
