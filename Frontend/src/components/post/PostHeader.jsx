import { Box, Avatar, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePost } from "../../api/post.service";

const PostHeader = ({ post }) => {
  const handleDelete = async () => {
    await deletePost(post._id);
    window.location.reload();
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
      <Avatar src={post.postedBy?.photo?.url} />
      <Typography sx={{ ml: 1, flexGrow: 1 }}>
        {post.postedBy?.username}
      </Typography>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default PostHeader;
