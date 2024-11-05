import { useState } from "react";
import ReviewItem from "./ReviewItem";
import { useNavigate, useOutletContext } from "react-router-dom";
import { apiUrl } from "../apiUrl";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Button,
} from '@mui/material';
import BaseballIcon from '@mui/icons-material/SportsCricket'; // or another baseball-like icon

const Reviews = () => {
  const { width, reviews, setReviews, token } = useOutletContext();
  const [editingReview, setEditingReview] = useState(null);
  const [reviewContent, setReviewContent] = useState({
    rating: "",
    comment: "",
  });
  const navigate = useNavigate();

  async function deleteReview(reviewId) {
    if (reviewId) {
      try {
        await fetch(`${apiUrl}/api/reviews/${reviewId}`, {
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
  }
  async function editReview(e, reviewId) {
    e.preventDefault();
    if (reviewId) {
      try {
        const response = await fetch(
          `${apiUrl}/api/review/${reviewId}`,
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
          prev.map((review) =>
            review.id === reviewId ? { ...review, ...updatedReview } : review
          )
        );
        setEditingReview(null);
        setReviewContent({ rating: "", comment: "" });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        mb: 4 
      }}>
        <BaseballIcon sx={{ mr: 1, color: '#113311' }} />
        <Typography variant="h4" component="h3" sx={{ 
          color: '#113311',
          fontFamily: '"Roboto Condensed", sans-serif',
          letterSpacing: '1.5px'
        }}>
          Your Reviews
        </Typography>
      </Box>

      {reviews.length > 0 ? (
        <TableContainer 
          component={Paper} 
          sx={{ 
            boxShadow: 3,
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          {width > 1000 ? (
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#113311' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ballpark</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Team</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Rating</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Your Review</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews.map((review) => (
                  <ReviewItem
                    key={review.id}
                    {...{
                      expanded: true,
                      editingReview,
                      review,
                      editReview,
                      setReviewContent,
                      reviewContent,
                      setEditingReview,
                      deleteReview,
                    }}
                  />
                ))}
              </TableBody>
            </Table>
          ) : (
            <Box sx={{ p: 2 }}>
              {reviews.map((review) => (
                <ReviewItem
                  key={review.id}
                  {...{
                    editingReview,
                    review,
                    editReview,
                    setReviewContent,
                    reviewContent,
                    setEditingReview,
                    deleteReview,
                  }}
                />
              ))}
            </Box>
          )}
        </TableContainer>
      ) : (
        <Card sx={{ 
          p: 4, 
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: 2
        }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            No Reviews Yet
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate("/")}
            sx={{ 
              backgroundColor: '#113311',
              '&:hover': {
                backgroundColor: '#1a4d1a'
              }
            }}
          >
            Visit Ballparks to Leave a Review
          </Button>
        </Card>
      )}
    </Box>
  );
};

export default Reviews;
