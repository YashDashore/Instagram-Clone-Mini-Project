import { CardMedia } from "@mui/material";

const PostMedia = ({ post }) => {
  return (
    <CardMedia
      component="img"
      image={post.post}
      alt="post"
      sx={{ maxHeight: 500 }}
    />
  );
};

export default PostMedia;
