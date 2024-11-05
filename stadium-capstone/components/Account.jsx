import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { apiUrl } from "../apiUrl";
import { Box, Container, Typography, TextField, Button, Paper } from '@mui/material';

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
  const [searchParam, setSearchParam] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [fail, setFail] = useState(null);
  const location = useLocation();

  //fetch data, checking for token and username to show account details
  useEffect(() => {
    async function fetchUserData() {
      if (!token || !userId) return;
      try {
        const response = await fetch(`${apiUrl}/api/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setGoogleId(result.googleId);
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

  async function editUser(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          password,
          email,
          firstName,
          lastName,
        }),
      });
      const json = await response.json();
      if (json.username) {
        setSuccess("User details updated!");
        setFail(null);
      } else {
        setFail("Username or Email already taken");
        setSuccess(null);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // If we're on the account details page, show the form
  if (location.pathname === '/users/me/account-details') {
    return (
      <Container maxWidth="md">
        <Box sx={{ 
          py: 4,
          minHeight: '100vh',
        }}>
          {!token ? (
            <Typography 
              variant="h5" 
              sx={{ 
                textAlign: 'center',
                color: 'error.main' 
              }}
            >
              Please log in to see your account details.
            </Typography>
          ) : (
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4,
                bgcolor: 'background.paper',
                borderRadius: 2,
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 4, 
                  textAlign: 'center',
                  color: '#009be5',
                  fontWeight: 'bold',
                  fontFamily: '"Roboto Condensed", sans-serif',
                }}
              >
                Edit Account Details
              </Typography>

              <form onSubmit={editUser}>
                <Box sx={{ 
                  display: 'grid', 
                  gap: 3,
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                }}>
                  <TextField
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    inputProps={{
                      minLength: 2,
                      pattern: "[A-Za-z]+",
                    }}
                    fullWidth
                  />

                  <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    inputProps={{
                      minLength: 2,
                      pattern: "[A-Za-z]+",
                    }}
                    fullWidth
                  />
                </Box>

                <Box sx={{ mt: 3, display: 'grid', gap: 3 }}>
                  <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                  />

                  <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    inputProps={{
                      minLength: 4,
                      pattern: "[a-zA-Z0-9]+",
                    }}
                    fullWidth
                  />
                  <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    inputProps={{
                      minLength: 6,
                    }}
                    fullWidth
                  />
                </Box>

                {success && (
                  <Typography 
                    sx={{ 
                      mt: 2, 
                      color: 'success.main',
                      textAlign: 'center' 
                    }}
                  >
                    {success}
                  </Typography>
                )}
                
                {fail && (
                  <Typography 
                    sx={{ 
                      mt: 2, 
                      color: 'error.main',
                      textAlign: 'center' 
                    }}
                  >
                    {fail}
                  </Typography>
                )}

                <Button 
                  type="submit"
                  variant="contained"
                  sx={{ 
                    mt: 4,
                    width: '100%',
                    py: 1.5,
                    background: 'linear-gradient(135deg, #009be5 0%, #006db3 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #006db3 0%, #004b7c 100%)',
                    },
                    fontSize: '1.1rem',
                    textTransform: 'none',
                  }}
                >
                  Save Changes
                </Button>
              </form>
            </Paper>
          )}
        </Box>
      </Container>
    );
  }

  // For all other routes, render the Outlet
  return (
    <div className="account-page-container">
      <div className="account-page-wrapper">
        <Outlet
          context={{
            visited,
            firstName,
            width,
            reviews,
            setReviews,
            token,
            userId,
            setVisited,
            searchParam,
            setSearchParam,
            comments,
            setComments,
          }}
        />
      </div>
    </div>
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
