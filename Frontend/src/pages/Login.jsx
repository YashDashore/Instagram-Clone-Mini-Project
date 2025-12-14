import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { loginUser } from "../services/auth.js"
import AuthInput from "../components/auth/AuthInput";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(form);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontFamily: "cursive", mb: 3 }}
      >
        Instagram
      </Typography>

      <form onSubmit={handleSubmit}>
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
          Log In
        </Button>
      </form>

      <Typography align="center" sx={{ mt: 2 }}>
        Don’t have an account? <Link to="/register">Sign up</Link>
      </Typography>
    </>
  );
};

export default Login;
