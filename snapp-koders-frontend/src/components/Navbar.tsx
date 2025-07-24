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
import { FiMenu, FiLogOut, FiX } from "react-icons/fi"; // React Icons

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
              <FiMenu size={24} />
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
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px={2}
                py={1}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, fontFamily: "Poppins" }}
                >
                  Menu
                </Typography>
                <IconButton onClick={handleDrawerToggle}>
                  <FiX size={20} />
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
                  <FiLogOut size={20} style={{ marginRight: 8 }} />
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
              <FiLogOut size={20} />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
