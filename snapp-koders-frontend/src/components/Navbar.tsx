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

const menuItems = [
  "Voice-led Expense Tracker",
  "Smart Financial Tips",
  "Bachat Saathi Chatbot",
];

const Navbar = ({ onMenuClick, onLogout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
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
                {menuItems.map((text) => (
                  <ListItem
                    button
                    key={text}
                    onClick={() => {
                      onMenuClick(text);
                      setDrawerOpen(false);
                    }}
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
                  button
                  onClick={() => {
                    onLogout();
                    setDrawerOpen(false);
                  }}
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
            {menuItems.map((text) => (
              <Typography
                key={text}
                variant="button"
                onClick={() => onMenuClick(text)}
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
