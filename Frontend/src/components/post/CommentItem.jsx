import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteComment } from "../../api/post.service";

const CommentItem = ({ comment, postId }) => {
  const handleDelete = async () => {
    await deleteComment(postId, comment._id);
    window.location.reload();
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="body2" sx={{ flexGrow: 1 }}>
        <b>{comment.postedBy.username}</b> {comment.comment}
      </Typography>
      <IconButton size="small" onClick={handleDelete}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default CommentItem;
