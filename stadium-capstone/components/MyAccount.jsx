import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Paper,
  Container 
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import StadiumIcon from '@mui/icons-material/Stadium';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useOutletContext } from 'react-router-dom';

const MyAccount = () => {
  const { firstName = "", visited = [], reviews = [] } = useOutletContext();

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        py: 4,
        minHeight: '100vh',
      }}>
        {/* Header Section */}
        <Typography 
          variant="h3" 
          sx={{ 
            mb: 4, 
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#009be5',
            fontFamily: '"Roboto Condensed", sans-serif',
          }}
        >
          Welcome Back, {firstName}!
        </Typography>
        
        {/* Stats Cards */}
        <Grid container spacing={4}>
          {/* Ballparks Card */}
          <Grid item xs={12} sm={6} lg={3}>
            <Card sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #009be5 0%, #006db3 100%)',
              color: 'white',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <StadiumIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h6">Ballparks Visited</Typography>
                </Box>
                <Typography variant="h2" sx={{ textAlign: 'center' }}>
                  {visited.length}/30
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Reviews Card */}
          <Grid item xs={12} sm={6} lg={3}>
            <Card sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
              color: 'white',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <RateReviewIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h6">Reviews Written</Typography>
                </Box>
                <Typography variant="h2" sx={{ textAlign: 'center' }}>
                  {reviews.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Progress Card */}
          <Grid item xs={12} sm={6} lg={3}>
            <Card sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
              color: 'white',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmojiEventsIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h6">Completion</Typography>
                </Box>
                <Typography variant="h2" sx={{ textAlign: 'center' }}>
                  {Math.round((visited.length / 30) * 100)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Status Card */}
          <Grid item xs={12} sm={6} lg={3}>
            <Card sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
              color: 'white',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PersonIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h6">Status</Typography>
                </Box>
                <Typography variant="h5" sx={{ textAlign: 'center' }}>
                  {visited.length === 30 ? 'All Star!' : 'Rookie'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Activity Section */}
        <Paper 
          elevation={3}
          sx={{ 
            mt: 4, 
            p: 3, 
            bgcolor: 'rgba(255,255,255,0.9)',
            borderRadius: 2
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, color: '#113311' }}>
            Recent Activity
          </Typography>
          {visited.length > 0 ? (
            <Grid container spacing={2}>
              {visited.slice(-3).reverse().map((visit, index) => (
                <Grid item xs={12} key={index}>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: 'rgba(0,0,0,0.05)',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <StadiumIcon sx={{ mr: 2, color: '#009be5' }} />
                    <Typography>
                      Visited {visit.name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>
              Start your journey by visiting your first ballpark!
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default MyAccount; 