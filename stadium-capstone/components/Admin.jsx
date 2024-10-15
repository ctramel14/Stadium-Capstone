import React, { useState, useEffect } from "react";

const Admin = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  console.log(token);

  useEffect(() => {
    fetchUsers();
    fetchReviews();
    fetchContactMessages();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/api/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  // Fetch all contact messages
  const fetchContactMessages = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/api/contactus`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setContactMessages(data);
    } catch (error) {
      console.error("Failed to fetch contact messages:", error);
    }
  };

  // Delete a review
  const deleteReview = async (reviewId) => {
    try {
      await fetch(`${process.env.API_URL}/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  // Delete a comment
  const deleteComment = async (commentId) => {
    try {
      await fetch(`${process.env.API_URL}/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setReviews(
        reviews.map((review) => ({
          ...review,
          comments: review.comments.filter(
            (comment) => comment.id !== commentId
          ),
        }))
      );
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await fetch(`${process.env.API_URL}/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div>
      <header className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
      </header>

      <header className="admin-header">
        <h2>Manage Users</h2>
      </header>
      <section className="all-users">
        {users.length === 0 ? (
          <p>No users available.</p>
        ) : (
          users.map((user) => (
            <div key={user.id}>
              <h3>
                {user.username} ({user.email})
              </h3>
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <button onClick={() => deleteUser(user.id)}> Delete User </button>
            </div>
          ))
        )}
      </section>

      <header className="admin-header">
        <h2>Manage Reviews & Replies</h2>
      </header>
      <section className="all-reviews-replies">
        {reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} id="single-review-admin">
              <h3 className="single-review-admin-title">
                {review.user?.username || "Unknown User"} on{" "}
                {review.stadium?.name || "Unknown Stadium"}:
              </h3>
              <hr className="horiziontal-line-admin" />
              <p id="review-content">
                {review.comment} <br />
                (Rating: {review.rating}/10)
                {review.imageURL && (
                  <div className="review-image-container">
                    <img
                      src={`${process.env.API_URL}${review.imageURL}`}
                      alt="Review Image"
                      className="review-image"
                    />
                  </div>
                )}{" "}
                <br />
                <button onClick={() => deleteReview(review.id)}>
                  {" "}
                  Delete Review{" "}
                </button>
              </p>
              <h4 className="replies-to-review-admin">All Replies:</h4>
              <div>
                {review.comments && review.comments.length > 0 ? (
                  review.comments.map((comment) => (
                    <p key={comment.id} id="individual-reply">
                      {comment.user?.username || "Unknown User"}:{" "}
                      {comment.content} <br />
                      <button
                        id="admin-button"
                        onClick={() => deleteComment(comment.id)}
                      >
                        {" "}
                        Delete Reply{" "}
                      </button>
                    </p>
                  ))
                ) : (
                  <p>No replies on this review.</p>
                )}
              </div>
            </div>
          ))
        )}
      </section>

      <header className="admin-header">
        <h2>Contact Us Messages</h2>
      </header>
      <section className="all-messages">
        {contactMessages.length === 0 ? (
          <p>No messages available.</p>
        ) : (
          contactMessages.map((message) => (
            <div key={message.id}>
              <h3>
                {message.name} ({message.email})
              </h3>
              <p>Message: {message.message}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Admin;
