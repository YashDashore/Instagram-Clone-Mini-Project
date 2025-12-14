import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Instagram
        </Typography>

        <IconButton color="inherit" onClick={() => navigate("/create")}>
          <AddBoxOutlinedIcon />
        </IconButton>

        <IconButton color="inherit" onClick={logout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
