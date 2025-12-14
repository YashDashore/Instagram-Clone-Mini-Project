import { Button, TextField, Box } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../context/authContext.jsx";

const LoginForm = () => {
  const { login } = useAuth();
  const [data, setData] = useState({ identifier: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField label="Username / Email" fullWidth margin="normal"
        onChange={(e) => setData({ ...data, identifier: e.target.value })}
      />
      <TextField label="Password" type="password" fullWidth margin="normal"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <Button type="submit" fullWidth variant="contained">Login</Button>
    </Box>
  );
};

export default LoginForm;
