import { Box, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { likeUnlikePost } from "../../api/post.service";

const PostActions = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(post.likes.length);

  const handleLike = async () => {
    const res = await likeUnlikePost(post._id);
    setLiked(res.isLiked);
    setCount(res.likesCount);
  };

  return (
    <Box sx={{ p: 1 }}>
      <IconButton onClick={handleLike}>
        {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>
      <Typography variant="body2">{count} likes</Typography>
    </Box>
  );
};

export default PostActions;
