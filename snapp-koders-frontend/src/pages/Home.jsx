import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import framer-motion
import Navbar from '../components/Navbar';
import Feature1 from '../../public/assets/feature-card-1.png';
import Feature2 from '../../public/assets/feature-card-2.png';
import Feature3 from '../../public/assets/feature-card-3.png';
import Hero from '../../public/assets/landing-page.png';

const features = [
  {
    title: 'Voice-led Expense Tracker',
    description: 'Log your daily expenses using voice — quick and easy.',
    image: Feature1,
    color: '#e3f2fd',
  },
  {
    title: 'Smart Financial Tips',
    description: 'Get personalized suggestions to save better and grow smarter.',
    image: Feature2,
    color: '#e8f5e9',
  },
  {
    title: 'Bachat Saathi Chatbot',
    description: 'Ask anything — voice or text. Your smart financial buddy.',
    image: Feature3,
    color: '#fff3e0',
  },
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleFeatureClick = (index) => {
    const feature = features[index];
    if (feature.title === 'Voice-led Expense Tracker') {
      navigate('/expense-tracker');
    } else if (feature.title === 'Smart Financial Tips') {
      navigate('/financial-advice');
    } else if (feature.title === 'Bachat Saathi Chatbot') {
      navigate('/chatbot');
    }
  };

  return (
    <Box>
  

      {/* Hero Section with Animation */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box
          display="flex"
          flexDirection={isMobile ? 'column' : 'row'}
          alignItems="center"
          justifyContent="space-around"
          px={isMobile ? 2 : 4}
          py={isMobile ? 4 : 4}
          gap={isMobile ? 2 : 4}
          height={'40vh'}
        >
          <Box
            flex={isMobile ? 0 : 1}
            marginLeft={isMobile ? 0 : 16}
            p={isMobile ? 1 : 0}
          >
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              textAlign={isMobile ? 'center' : 'left'}
              gutterBottom
            >
              Welcome to <br /> Bachat Saathi 👋
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign={isMobile ? 'center' : 'left'}
            >
              Empower your finances with smart tracking, personalized tips,{' '}
              <br />
              and an AI assistant at your fingertips.
            </Typography>
          </Box>
          <Box flex={1}>
            <motion.img
              src={Hero}
              alt="Hero"
              style={{ width: '100%', maxWidth: '35vh', height: '35vh' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          </Box>
        </Box>
      </motion.div>

      {/* Divider Animation */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
        style={{ transformOrigin: 'center' }}
      >
        <Box
          height={2}
          width="100px"
          mx="auto"
          mb={4}
          sx={{ backgroundColor: '#ccc', borderRadius: 10 }}
        />
      </motion.div>

      {/* Features Section with Animation */}
      <Box px={isMobile ? 2 : 6} py={2}>
        <Grid container spacing={isMobile ? 2 : 4} sx={{ justifyContent: 'center' }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  sx={{
                    backgroundColor: feature.color,
                    borderRadius: 4,
                    height: '30vh',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                  }}
                  elevation={0}
                  onClick={() => handleFeatureClick(index)}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="center" mb={3}>
                      <Box
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #ffffff88, #ffffff22)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          src={feature.image}
                          alt={feature.title}
                          style={{ width: 40, height: 40, borderRadius: '50%' }}
                        />
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
                      sx={{ color: 'text.secondary', px: 1 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;