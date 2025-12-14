import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import CommentItem from "./CommentItem";
import { commentOnPost } from "../../api/post.service";

const PostComments = ({ post }) => {
  const [text, setText] = useState("");

  const handleComment = async () => {
    await commentOnPost(post._id, text);
    setText("");
    window.location.reload();
  };

  return (
    <Box sx={{ p: 1 }}>
      {post.comments.map((c) => (
        <CommentItem key={c._id} comment={c} postId={post._id} />
      ))}

      <Box sx={{ display: "flex", mt: 1 }}>
        <TextField
          size="small"
          fullWidth
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={handleComment}>Post</Button>
      </Box>
    </Box>
  );
};

export default PostComments;
