import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const menuItems = [
  { text: "Voice-led Expense Tracker", route: "/expense-tracker" },
  { text: "Smart Financial Tips", route: "/financial-advice" },
  { text: "Bachat Saathi Chatbot", route: "/chatbot" },
];

const Navbar = ({ onLogout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (route: string) => {
    navigate(route); // Navigate to the specified route
    setDrawerOpen(false); // Close the drawer
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fef6ed",
        color: "#000",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            fontFamily: "Poppins, sans-serif",
            letterSpacing: 0.5,
            color: "#000",
          }}
        >
          Bachat Saathi
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              PaperProps={{
                sx: {
                  background: "#fef6ed",
                  width: "75vw",
                  maxWidth: 280,
                  paddingX: 1,
                },
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, fontFamily: "Poppins" }}
                >
                  Menu
                </Typography>
                <IconButton onClick={handleDrawerToggle}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Divider />
              <List>
                {menuItems.map(({ text, route }) => (
                  <ListItem
                    component="button"
                    key={text}
                    onClick={() => handleMenuClick(route)}
                    sx={{ all: "unset", cursor: "pointer", display: "block" }}
                  >
                    <ListItemText
                      primary={text}
                      primaryTypographyProps={{
                        sx: {
                          fontWeight: 500,
                          fontFamily: "Poppins",
                          color: "#000",
                        },
                      }}
                    />
                  </ListItem>
                ))}
                <Divider sx={{ my: 1 }} />
                <ListItem
                  component="div"
                  onClick={() => {
                    onLogout();
                    setDrawerOpen(false);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <LogoutIcon sx={{ mr: 1, color: "#000" }} />
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{
                      sx: { color: "#000", fontWeight: 500 },
                    }}
                  />
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {menuItems.map(({ text, route }) => (
              <Typography
                key={text}
                variant="button"
                onClick={() => handleMenuClick(route)}
                sx={{
                  mx: 2,
                  cursor: "pointer",
                  color: "#000",
                  fontWeight: 500,
                  fontFamily: "Poppins",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {text}
              </Typography>
            ))}
            <IconButton color="inherit" onClick={onLogout}>
              <LogoutIcon sx={{ color: "#000" }} />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;