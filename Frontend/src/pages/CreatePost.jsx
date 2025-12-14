import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { createPost } from "../services/post.js";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append("caption", caption);
    fd.append("post", file);

    await createPost(fd);
    navigate("/");
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <TextField
        label="Caption"
        fullWidth
        margin="normal"
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
        Post
      </Button>
    </Box>
  );
};

export default CreatePost;
