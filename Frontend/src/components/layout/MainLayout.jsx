import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ mt: 2 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default MainLayout;
