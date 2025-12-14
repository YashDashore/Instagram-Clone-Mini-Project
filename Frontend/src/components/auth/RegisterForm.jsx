import { Button, TextField, Box } from "@mui/material";
import { useState } from "react";
import { registerUser } from "../../api/auth.service";

const RegisterForm = () => {
  const [form, setForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach(k => fd.append(k, form[k]));
    await registerUser(fd);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField label="Name" fullWidth margin="normal" onChange={e => setForm({ ...form, name: e.target.value })}/>
      <TextField label="Username" fullWidth margin="normal" onChange={e => setForm({ ...form, username: e.target.value })}/>
      <TextField label="Email" fullWidth margin="normal" onChange={e => setForm({ ...form, email: e.target.value })}/>
      <TextField label="Password" type="password" fullWidth margin="normal" onChange={e => setForm({ ...form, password: e.target.value })}/>
      <input type="file" onChange={e => setForm({ ...form, Profile_Photo: e.target.files[0] })} />
      <Button type="submit" fullWidth variant="contained">Register</Button>
    </Box>
  );
};

export default RegisterForm;
