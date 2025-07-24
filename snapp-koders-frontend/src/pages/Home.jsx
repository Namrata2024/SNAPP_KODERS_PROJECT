import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Feature1 from "../../public/assets/feature-card-1.png";
import Feature2 from "../../public/assets/feature-card-2.png";
import Feature3 from "../../public/assets/feature-card-3.png";
import Hero from "../../public/assets/landing-page.png"; // your header illustration

const features = [
  {
    title: "Voice-led Expense Tracker",
    description: "Log your daily expenses using voice — quick and easy.",
    image: Feature1,
    color: "#e3f2fd",
  },
  {
    title: "Smart Financial Tips",
    description: "Get personalized suggestions to save better and grow smarter.",
    image: Feature2,
    color: "#e8f5e9",
  },
  {
    title: "Bachat Saathi Chatbot",
    description: "Ask anything — voice or text. Your smart financial buddy.",
    image: Feature3,
    color: "#fff3e0",
  },
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuClick = (title) => {
    const el = document.getElementById(title);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    // clear token / redirect
    alert("Logged out");
  };

  return (
    <Box>
      <Navbar onMenuClick={handleMenuClick} onLogout={handleLogout} />

      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        alignItems="center"
        justifyContent="space-around"
        px={isMobile ? 2 : 4}
        py={isMobile ? 4 : 4}
        gap={isMobile? 2:4}
        height={"90vh"}
      >
        <Box flex={isMobile? 0:1} marginLeft={isMobile? 0:16} p={isMobile?1:0}>
          <Typography variant={isMobile ? "h3" : "h2"} textAlign={isMobile?"center":"left"} gutterBottom>
            Welcome to <br></br>Bachat Saathi 👋
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign={isMobile?"center":"left"}>
            Empower your finances with smart tracking, personalized tips, <br></br>and an AI assistant at your fingertips.
          </Typography>
        </Box>
        <Box flex={1}>
          <img src={Hero} alt="Hero" style={{ width: "100%", maxWidth: 400 }} />
        </Box>
      </Box>
      
      <Box
        height={2}
        width="100px"
        mx="auto"
        mb={4}
        sx={{ backgroundColor: "#ccc", borderRadius: 10 }}
      />

      <Box px={isMobile ? 2 : 6} py={4}>
        <Grid container spacing={isMobile ? 2 : 4}>
  {features.map((feature, index) => (
    <Grid item xs={12} sm={4} key={index}>
      <Card
        sx={{
          backgroundColor: feature.color,
          borderRadius: 4,
          height: "100%",
          p: 2,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          },
        }}
        elevation={0}
      >
        <CardContent>
          <Box display="flex" justifyContent="center" mb={3}>
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ffffff88, #ffffff22)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={feature.image} alt={feature.title} style={{ width: 80, height: 80, borderRadius: "50%" }} />
            </Box>
          </Box>
          <Typography
            variant="h6"
            align="center"
            sx={{ fontWeight: 600, mb: 1 }}
          >
            {feature.title}
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{ color: "text.secondary", px: 1 }}
          >
            {feature.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

      </Box>
    </Box>
  );
};

export default Home;
