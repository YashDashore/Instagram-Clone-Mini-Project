import { TextField } from "@mui/material";

const AuthInput = ({ label, type = "text", ...props }) => {
  return (
    <TextField
      label={label}
      type={type}
      fullWidth
      margin="normal"
      size="small"
      {...props}
    />
  );
};

export default AuthInput;
