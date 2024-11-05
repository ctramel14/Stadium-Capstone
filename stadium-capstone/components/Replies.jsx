import { useOutletContext, useNavigate } from "react-router-dom";
import { apiUrl } from "../apiUrl";
import { useState } from "react";
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
  TextField,
  Stack,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Replies = () => {
  const { token, searchParam, comments, setComments, setSearchParam, width } = useOutletContext();
  const [editingComment, setEditingComment] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const navigate = useNavigate();

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
      const response = await fetch(`${apiUrl}/api/comment/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: commentContent }),
      });
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

  //search replies/comments based on the actual review, the comment content and ballpark name
  const commentsToDisplay = searchParam
    ? comments.filter(
        (com) =>
          com.content.toLowerCase().includes(searchParam) ||
          com.review.comment.toLowerCase().includes(searchParam) ||
          com.review.stadium.name.toLowerCase().includes(searchParam)
      )
    : comments;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        gap: 3,
        mb: 4 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CommentIcon sx={{ color: '#113311' }} />
          <Typography variant="h4" component="h3" sx={{ 
            color: '#113311',
            fontFamily: '"Roboto Condensed", sans-serif',
            letterSpacing: '1.5px'
          }}>
            Your Replies
          </Typography>
        </Box>
        
        <TextField
          placeholder="Search..."
          variant="outlined"
          size="small"
          onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: '100%', sm: '300px' } }}
        />
      </Box>

      {commentsToDisplay.length > 0 ? (
        <TableContainer 
          component={Paper} 
          sx={{ 
            boxShadow: 3,
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          {width > 1000 ? (
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#113311' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ballpark</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Review</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Your Reply</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {commentsToDisplay.map((comment) => (
                  <TableRow 
                    key={comment.id}
                    sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}
                  >
                    {editingComment === comment.id ? (
                      <TableCell colSpan={5}>
                        <Box sx={{ p: 2 }}>
                          <form onSubmit={(e) => editComment(e, comment.id)}>
                            <Stack spacing={2}>
                              <TextField
                                label="Edit Reply"
                                multiline
                                rows={4}
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                                fullWidth
                              />
                              <Stack direction="row" spacing={2} justifyContent="flex-end">
                                <Button
                                  variant="outlined"
                                  onClick={() => setEditingComment(null)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="contained"
                                  type="submit"
                                >
                                  Save Changes
                                </Button>
                              </Stack>
                            </Stack>
                          </form>
                        </Box>
                      </TableCell>
                    ) : (
                      <>
                        <TableCell>{comment.review.stadium.name}</TableCell>
                        <TableCell>{comment.review.comment}</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>{comment.content}</TableCell>
                        <TableCell>{new Date(comment.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Button
                              size="small"
                              startIcon={<EditIcon />}
                              onClick={() => {
                                setEditingComment(comment.id);
                                setCommentContent(comment.content);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              size="small"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() => deleteComment(comment.id)}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Box sx={{ p: 2 }}>
              {commentsToDisplay.map((comment) => (
                <Card key={comment.id} sx={{ mb: 2, backgroundColor: '#fff' }}>
                  <Box sx={{ p: 2 }}>
                    {editingComment === comment.id ? (
                      <form onSubmit={(e) => editComment(e, comment.id)}>
                        <Stack spacing={2}>
                          <TextField
                            label="Edit Reply"
                            multiline
                            rows={4}
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            fullWidth
                          />
                          <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button
                              variant="outlined"
                              onClick={() => setEditingComment(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="contained"
                              type="submit"
                            >
                              Save Changes
                            </Button>
                          </Stack>
                        </Stack>
                      </form>
                    ) : (
                      <Stack spacing={2}>
                        <Typography variant="h6">
                          {comment.review.stadium.name}
                        </Typography>
                        <Box>
                          <Typography color="text.secondary" gutterBottom>
                            Original Review
                          </Typography>
                          <Typography>{comment.review.comment}</Typography>
                        </Box>
                        <Box>
                          <Typography color="text.secondary" gutterBottom>
                            Your Reply
                          </Typography>
                          <Typography sx={{ fontWeight: 'bold' }}>
                            {comment.content}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography color="text.secondary" gutterBottom>
                            Date
                          </Typography>
                          <Typography>
                            {new Date(comment.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={2}>
                          <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={() => {
                              setEditingComment(comment.id);
                              setCommentContent(comment.content);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => deleteComment(comment.id)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </Stack>
                    )}
                  </Box>
                </Card>
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
            No Replies Yet
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
            Visit Ballparks to Leave a Reply
          </Button>
        </Card>
      )}
    </Box>
  );
};

export default Replies;
