import { useNavigate, useOutletContext } from "react-router-dom";
import BallparkIcon from "../src/assets/ballpark-icon.png";
import { apiUrl } from "../apiUrl";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Container,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

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

const Ballpark = () => {
  const { visited, firstName, token, userId, setVisited } = useOutletContext();
  const navigate = useNavigate();

  //deletes ball parks visited based off of ID of stadium
  async function deleteVisitedStadium(stadiumId) {
    try {
      await fetch(`${apiUrl}/api/user/${userId}/visitedstadium/${stadiumId}`, {
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

  const totalBallparks = 30;
  const BallParksRemaining = totalBallparks - visited.length;

  return (
    <Box sx={{ 
      bgcolor: '#113311', 
      minHeight: '100vh',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='223' height='223' viewBox='0 0 20 20'%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='%23242' points='20 10 10 0 0 0 20 20'/%3E%3Cpolygon fill='%23242' points='0 10 0 20 10 20'/%3E%3C/g%3E%3C/svg%3E")`,
      pt: 3
    }}>
      <Container maxWidth="lg">
        <Paper 
          elevation={3}
          sx={{ 
            p: 4, 
            mb: 4, 
            background: 'linear-gradient(to right, rgba(17, 51, 17, 0.95), rgba(17, 51, 17, 0.8))',
            color: 'white',
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <Box sx={{ 
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4,
          }}>
            {/* Left side - Icon and Progress */}
            <Box sx={{ 
              flex: '0 0 auto',
              textAlign: 'center',
              position: 'relative'
            }}>
              <Box sx={{
                position: 'relative',
                width: 200,
                height: 200,
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <img 
                  src={BallparkIcon} 
                  alt="Baseball Field" 
                  style={{ 
                    width: '100%',
                    height: '100%',
                    filter: 'brightness(0) invert(1)',
                    transition: 'transform 0.3s ease',
                    opacity: 0.8
                  }}
                />
                <Typography 
                  variant="h2" 
                  sx={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#90b58a',
                    fontWeight: 'bold',
                    fontSize: '4rem',
                    textShadow: `
                      -1px -1px 0 #113311,  
                       1px -1px 0 #113311,
                      -1px  1px 0 #113311,
                       1px  1px 0 #113311,
                       2px 2px 4px rgba(0,0,0,0.5)
                    `,
                    zIndex: 2,
                    fontFamily: '"Roboto Condensed", sans-serif',
                    letterSpacing: '2px'
                  }}
                >
                  {visited.length}
                </Typography>
              </Box>
            </Box>

            {/* Right side - Welcome and Stats */}
            <Box sx={{ 
              flex: 1,
              textAlign: { xs: 'center', md: 'left' }
            }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  mb: 2,
                  fontFamily: '"Roboto Condensed", sans-serif',
                  letterSpacing: '2px',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  fontWeight: 'bold'
                }}
              >
                Welcome Back, {firstName}!
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontFamily: '"Roboto Condensed", sans-serif',
                    letterSpacing: '1.5px',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    color: 'rgba(255, 255, 255, 0.9)'
                  }}
                >
                  Your Ballpark Journey
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    mt: 1,
                    fontFamily: '"Roboto Condensed", sans-serif',
                    color: visited.length === 30 ? '#ffd700' : 'white'
                  }}
                >
                  {visited.length === 30 ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 2 }}>
                      <EmojiEventsIcon sx={{ fontSize: 40, color: '#ffd700' }} />
                      All 30 Ballparks Visited!
                    </Box>
                  ) : (
                    `${visited.length} down, ${BallParksRemaining} to go!`
                  )}
                </Typography>
              </Box>

              {visited.length < 30 && (
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontFamily: '"Roboto Condensed", sans-serif',
                    fontStyle: 'italic'
                  }}
                >
                  Keep exploring America's ballparks!
                </Typography>
              )}
            </Box>
          </Box>
        </Paper>

        {/* Visited Ballparks Section */}
        <Typography 
          variant="h4" 
          sx={{ 
            color: 'white',
            textAlign: 'center',
            mb: 4,
            fontFamily: '"Roboto Condensed", sans-serif',
            letterSpacing: '2px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
          }}
        >
          Your Visited Ballparks
        </Typography>

        {visited.length > 0 ? (
          <Grid container spacing={3} sx={{ pb: 4 }}>
            {visited.map((stadium) => (
              <Grid item xs={12} sm={6} md={4} key={stadium.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: stadiumColors[stadium.id],
                    color: 'white',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2), 0 12px 24px rgba(0, 0, 0, 0.7)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={stadium.imageOutsideURL}
                    alt={stadium.name}
                    sx={{ 
                      cursor: 'pointer',
                      opacity: 0.7
                    }}
                    onClick={() => navigate(`/stadiums/${stadium.id}/`)}
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography 
                      variant="h5" 
                      gutterBottom 
                      sx={{ 
                        cursor: 'pointer',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        fontFamily: '"Roboto Condensed", sans-serif',
                        letterSpacing: '1.5px'
                      }}
                      onClick={() => navigate(`/stadiums/${stadium.id}/`)}
                    >
                      {stadium.name}
                    </Typography>
                    <Typography 
                      variant="h6"
                      sx={{ 
                        mb: 2,
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        fontFamily: '"Roboto Condensed", sans-serif'
                      }}
                    >
                      {stadium.teamName}
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteVisitedStadium(stadium.id)}
                      sx={{ 
                        bgcolor: 'rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                          bgcolor: 'rgba(255, 0, 0, 0.3)'
                        }
                      }}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', p: 4 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/")}
              sx={{ 
                bgcolor: '#0051b6',
                '&:hover': {
                  bgcolor: '#009aff'
                }
              }}
            >
              Add Ballparks
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Ballpark;
