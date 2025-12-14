import { Box, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#fafafa",
      }}
    >
      <Paper sx={{ p: 4, width: 350 }}>
        <Outlet />
      </Paper>
    </Box>
  );
};

export default AuthLayout;
