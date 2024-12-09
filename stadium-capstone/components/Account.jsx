import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { apiUrl } from "../apiUrl";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";

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
  if (location.pathname === "/users/me/account-details") {
    return (
      <Container maxWidth="md">
        <Box
          sx={{
            py: 4,
            minHeight: "100vh",
          }}
        >
          {!token ? (
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                color: "error.main",
              }}
            >
              Please log in to see your account details.
            </Typography>
          ) : (
            <Paper
              elevation={3}
              sx={{
                p: 4,
                bgcolor: "background.paper",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  mb: 4,
                  textAlign: "center",
                  color: "#009be5",
                  fontWeight: "bold",
                  fontFamily: '"Roboto Condensed", sans-serif',
                }}
              >
                Edit Account Details
              </Typography>

              <form onSubmit={editUser}>
                <Box
                  sx={{
                    display: "grid",
                    gap: 3,
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  }}
                >
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

                <Box sx={{ mt: 3, display: "grid", gap: 3 }}>
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
                      minLength: 4
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
                      color: "success.main",
                      textAlign: "center",
                    }}
                  >
                    {success}
                  </Typography>
                )}

                {fail && (
                  <Typography
                    sx={{
                      mt: 2,
                      color: "error.main",
                      textAlign: "center",
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
                    width: "100%",
                    py: 1.5,
                    background:
                      "linear-gradient(135deg, #009be5 0%, #006db3 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #006db3 0%, #004b7c 100%)",
                    },
                    fontSize: "1.1rem",
                    textTransform: "none",
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
  );
};

export default Account;
