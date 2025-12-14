import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { registerUser } from "../services/auth.js";
import AuthInput from "../components/auth/AuthInput.jsx";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    photo: null,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setForm({ ...form, photo: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      await registerUser(formData);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontFamily: "cursive", mb: 2 }}
      >
        Instagram
      </Typography>

      <Typography align="center" sx={{ mb: 2 }}>
        Sign up to see photos and videos
      </Typography>

      <form onSubmit={handleSubmit}>
        <AuthInput
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />

        <AuthInput
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <AuthInput
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <input
          type="file"
          name="photo"
          onChange={handleChange}
          style={{ marginTop: 10 }}
        />

        {error && (
          <Typography color="error" variant="body2" align="center">
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </form>

      <Typography align="center" sx={{ mt: 2 }}>
        Have an account? <Link to="/login">Log in</Link>
      </Typography>
    </>
  );
};

export default Register;
