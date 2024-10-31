import React, { useState, useEffect } from "react";
import ReviewsTable from "./ReviewsTable";
import { useNavigate } from "react-router-dom";
import BallparkIcon from "../src/assets/ballpark-icon.png";
const apiUrl = "https://stadium-capstone.onrender.com"

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

const Account = ({
  token,
  username,
  setUsername,
  firstName,
  setFirstName,
  userId,
  width,
  googleId,
  setGoogleId,
  email,
  setEmail,
  lastName,
  setLastName,
}) => {
  const [visited, setVisited] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null)
  const [fail, setFail] = useState(null)
  const message = `Please log in to see your account details.`;
  const navigate = useNavigate();
  //fetch data, checking for token and username to show account details
  useEffect(() => {
    async function fetchUserData() {
      if (!token || !userId) return;
      try {
        const response = await fetch(
          `${apiUrl}/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        setGoogleId(result.googleId)
        setVisited(result.visitedStadiums.map((v) => v.stadium));
        setReviews(result.reviews);
        setComments(result.comments); 
        if (!username) {
          setUsername(result.username);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserData();
  }, [token, userId]);
  //deletes ball parks visited based off of ID of stadium
  async function deleteVisitedStadium(stadiumId) {
    try {
      await fetch(
        `${apiUrl}/api/user/${userId}/visitedstadium/${stadiumId}`,
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
  //deletes replies based off of id
  async function deleteComment(commentId) {
    try {
      await fetch(`${apiUrl}/api/comments/${commentId}`, {
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

  async function editComment(e, commentId) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${apiUrl}/api/comment/${commentId}`,
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

  async function editUser(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${apiUrl}/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username, password, email, firstName, lastName }),
        }
      );
      const json = await response.json();
      if (json.username) {
        setSuccess("User details updated!")
        setFail(null)
      } else {
        setFail('Username or Email already taken')
        setSuccess(null)
      }
    } catch (error) {
      console.error(error);
    }
  }
  //search replies/comments based on the actual review, the comment content and ballpark name
  const commentsToDisplay = searchParam
    ? comments.filter(
        (com) =>
          com.content.toLowerCase().includes(searchParam) ||
          com.review.comment.toLowerCase().includes(searchParam) ||
          com.review.stadium.name.toLowerCase().includes(searchParam)
      )
    : comments;

  const totalBallparks = 30;
  const BallParksRemaining = totalBallparks - visited.length;

  return (
    <>
      <div className="account-page-container">
        {!token ? (
          <h3 className="login-alert-message">{message}</h3>
        ) : (
          <div className="account-page-wrapper">
            <section className="top-account-section">
              <div className="topDiv">
                <img
                  src={BallparkIcon}
                  alt="Baseball Field"
                  id="ballpark-symbol"
                />
              </div>
              <div className="topDiv">
                <p>Welcome, {firstName}!</p>
                {(() => {
                  if (BallParksRemaining === 0 && visited.length === 30) {
                    return (
                      <p>
                        Congratulations! You have visited all 30 MLB ballparks!
                      </p>
                    );
                  } else {
                    return (
                      <>
                        <p>
                          You have visited {visited.length} MLB{" "}
                          {visited.length === 1 ? "ballpark" : "ballparks"}
                        </p>
                        <p>
                          You have {BallParksRemaining} MLB{" "}
                          {BallParksRemaining === 1 ? "ballpark" : "ballparks"}{" "}
                          left to visit!
                        </p>
                      </>
                    );
                  }
                })()}
              </div>
              <div className="topDiv"></div>
            </section>
            <header className="section-header">
              <h3>Your Visited Ballparks </h3>
            </header>
            {visited.length > 0 ? (
              <div className="visited-grid-container">
                {visited.map((stadium) => (
                  <div
                    key={stadium.id}
                    className="visited-cards"
                    style={{ backgroundColor: stadiumColors[stadium.id] }}
                  >
                    <img
                      src={stadium.imageOutsideURL}
                      alt={stadium.name}
                      onClick={() => navigate(`/stadiums/${stadium.id}/`)}
                    />
                    <strong>
                      <h2 onClick={() => navigate(`/stadiums/${stadium.id}/`)}>
                        {stadium.name}
                      </h2>
                    </strong>
                    <p onClick={() => navigate(`/stadiums/${stadium.id}/`)}>
                      {stadium.teamName}
                    </p>
                    <button onClick={() => deleteVisitedStadium(stadium.id)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div id="noStadiumsButton">
                <button onClick={() => navigate("/")}>Add Ballparks</button>
              </div>
            )}
            <hr className="line-across-account"></hr>
            <ReviewsTable {...{ width, reviews, setReviews, token }} />
            <header className="section-header-replies">
              <h3>Your Replies</h3>
              <div className="search">
                <label>
                  <input
                    id="searchfield"
                    type="text"
                    className="searchInput"
                    placeholder="Search..."
                    onChange={(e) =>
                      setSearchParam(e.target.value.toLowerCase())
                    }
                  />
                </label>
              </div>
            </header>
            {commentsToDisplay.length > 0 ? (
              <div className="table-wrapper">
                <table className="comments-table">
                  <thead>
                    <tr className="table-headers">
                      <th>Ballpark</th>
                      <th>Review</th>
                      <th>Your Reply</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {commentsToDisplay.map((comment) => (
                      <tr key={comment.id}>
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
                            <td>{comment.review.comment}</td>
                            <td>
                              <strong>{comment.content}</strong>
                            </td>
                            <td>
                              {new Date(comment.date).toLocaleDateString()}
                            </td>
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
              <p id="nothingWarning">
                Go to any <span onClick={() => navigate("/")}>ballpark</span>{" "}
                page and reply to a user's review to see your replies here
              </p>
            )}
          </div>
        )}
      </div> 
      <div className="account-change-container">
          <form id="form" onSubmit={editUser}>
            <p className="title">Edit Account Details</p>
            <div className="flex">
              <label>
                <input
                  className="input"
                  type="text"
                  minLength="2"
                  value={firstName}
                  placeholder="First Name"
                  required pattern="[A-Za-z]+"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <span>First Name</span>
              </label>

              <label>
                <input
                  className="input"
                  type="text"
                  minLength="2"
                  value={lastName}
                  placeholder="Last Name"
                  required pattern="[A-Za-z]+"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <span>Last Name</span>
              </label>
            </div>
            {googleId.length < 1 &&
            <label>
              <input
                className="input"
                type="email"
                minLength="8"
                value={email}
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>Email</span>
            </label>}

            <label>
              <input
                id="username-input"
                className="input"
                type="text"
                minLength="4"
                value={username}
                placeholder="Username"
                required 
                pattern="[a-zA-Z0-9]+"
                onChange={(e) => setUsername(e.target.value)}
              />
              <span>Username</span>
            </label>
            <label>
              <input
                className="input"
                minLength="6"
                value={password}
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>Password</span>
            </label>
            {success && <h4>{success}</h4>}
            {fail && <h4>{fail}</h4>}
            <button className="submit" type="submit">
              Submit
            </button>
            </form>
            </div>
    </>
  );
};

export default Account;
