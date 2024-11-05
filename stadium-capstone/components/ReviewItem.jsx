import React from "react";
import EditReviewForm from "./EditReviewForm";
import {
  TableRow,
  TableCell,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Divider,
  Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ReviewItem = ({
  expanded = false,
  editingReview,
  review,
  editReview,
  setReviewContent,
  reviewContent,
  setEditingReview,
  deleteReview,
}) => {
  return expanded ? (
    <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
      {editingReview === review.id ? (
        <TableCell colSpan={6}>
          <EditReviewForm
            {...{
              review,
              editReview,
              setReviewContent,
              reviewContent,
              setEditingReview,
            }}
          />
        </TableCell>
      ) : (
        <>
          <TableCell>{review.stadium.name}</TableCell>
          <TableCell>{review.stadium.teamName}</TableCell>
          <TableCell>
            <Rating value={review.rating / 2} precision={0.5} readOnly />
          </TableCell>
          <TableCell>{review.comment}</TableCell>
          <TableCell>{new Date(review.date).toLocaleDateString()}</TableCell>
          <TableCell>
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                startIcon={<EditIcon />}
                onClick={() => {
                  setEditingReview(review.id);
                  setReviewContent({
                    rating: review.rating,
                    comment: review.comment,
                  });
                }}
              >
                Edit
              </Button>
              <Button
                size="small"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => deleteReview(review.id)}
              >
                Delete
              </Button>
            </Stack>
          </TableCell>
        </>
      )}
    </TableRow>
  ) : (
    <Card sx={{ mb: 2, backgroundColor: '#fff' }}>
      <CardContent>
        {editingReview === review.id ? (
          <EditReviewForm
            {...{
              review,
              editReview,
              setReviewContent,
              reviewContent,
              setEditingReview,
            }}
          />
        ) : (
          <Stack spacing={2}>
            <Typography variant="h6">
              {review.stadium.name}
            </Typography>
            <Divider />
            <Box>
              <Typography color="text.secondary" gutterBottom>
                Team
              </Typography>
              <Typography>{review.stadium.teamName}</Typography>
            </Box>
            <Box>
              <Typography color="text.secondary" gutterBottom>
                Rating
              </Typography>
              <Rating value={review.rating / 2} precision={0.5} readOnly />
            </Box>
            <Box>
              <Typography color="text.secondary" gutterBottom>
                Your Review
              </Typography>
              <Typography>{review.comment}</Typography>
            </Box>
            <Box>
              <Typography color="text.secondary" gutterBottom>
                Date Posted
              </Typography>
              <Typography>
                {new Date(review.date).toLocaleDateString()}
              </Typography>
            </Box>
            {review.imageURL && (
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Image
                </Typography>
                <img
                  src={`${process.env.API_URL}${review.imageURL}`}
                  alt="Review"
                  style={{ 
                    maxWidth: '100%', 
                    height: 'auto',
                    borderRadius: '8px'
                  }}
                />
              </Box>
            )}
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => {
                  setEditingReview(review.id);
                  setReviewContent({
                    rating: review.rating,
                    comment: review.comment,
                  });
                }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => deleteReview(review.id)}
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewItem;
