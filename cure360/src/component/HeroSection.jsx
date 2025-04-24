import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid,
  Paper,
  useMediaQuery 
} from '@mui/material';
import { KeyboardArrowRight, CalendarMonth, LocalHospital, Phone } from '@mui/icons-material';
import { motion } from 'framer-motion';

// Carousel data
const carouselData = [
  {
    title: "Your Health is Our Priority",
    subtitle: "Access quality healthcare services all in one place.",
    image: "/api/placeholder/600/400",
    color: "linear-gradient(120deg, #0288d1 0%, #26c6da 100%)"
  },
  {
    title: "Connect with Top Specialists",
    subtitle: "Find the right doctor for your specific healthcare needs.",
    image: "/api/placeholder/600/400",
    color: "linear-gradient(120deg, #00796b 0%, #4caf50 100%)"
  },
  {
    title: "Emergency Care Available 24/7",
    subtitle: "Quick response when you need it the most.",
    image: "/api/placeholder/600/400",
    color: "linear-gradient(120deg, #c2185b 0%, #f06292 100%)"
  }
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const isMobile = useMediaQuery('(max-width:600px)');
  
  // Auto-change carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Floating statistic cards
  const stats = [
    { icon: <LocalHospital />, value: "500+", label: "Partner Hospitals" },
    { icon: <CalendarMonth />, value: "24/7", label: "Available Service" },
    { icon: <Phone />, value: "8000+", label: "Active Users" }
  ];

  return (
    <Box 
      sx={{ 
        position: 'relative',
        pb: 12,
        pt: { xs: 4, md: 8 },
        background: carouselData[current].color,
        transition: 'background 1s ease',
        overflow: 'hidden'
      }}
    >
      {/* Background pattern */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        background: 'url("/api/placeholder/100/100") repeat',
        zIndex: 0
      }} />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
            >
              <Typography 
                variant="h2" 
                component="h1" 
                color="white" 
                fontWeight="bold"
                sx={{ mb: 2 }}
              >
                {carouselData[current].title}
              </Typography>
              
              <Typography 
                variant="h5" 
                component="p" 
                color="white" 
                sx={{ mb: 4, opacity: 0.9 }}
              >
                {carouselData[current].subtitle}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  size="large"
                  color="secondary"
                  endIcon={<KeyboardArrowRight />}
                  sx={{ 
                    borderRadius: 2,
                    fontWeight: 'bold',
                    px: 3,
                    background: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.9)',
                    }
                  }}
                >
                  Book Appointment
                </Button>
                
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    borderRadius: 2,
                    fontWeight: 'bold',
                    px: 3,
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      background: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Emergency Call
                </Button>
              </Box>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <motion.div
                key={`image-${current}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Paper 
                  elevation={8}
                  sx={{ 
                    borderRadius: 4,
                    overflow: 'hidden',
                    transform: 'perspective(1000px) rotateY(-5deg)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <img 
                    src={carouselData[current].image} 
                    alt={carouselData[current].title} 
                    style={{ 
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }} 
                  />
                </Paper>
              </motion.div>
              
              {/* Carousel indicators */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  mt: 2
                }}
              >
                {carouselData.map((_, index) => (
                  <Box 
                    key={index}
                    onClick={() => setCurrent(index)}
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: current === index ? 'white' : 'rgba(255,255,255,0.5)',
                      mx: 0.5,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        {/* Floating stats cards */}
        <Box 
          sx={{ 
            mt: { xs: 4, md: 8 }, 
            position: 'relative',
            transform: isMobile ? 'translateY(0)' : 'translateY(50%)',
            zIndex: 2
          }}
        >
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      background: 'white',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 8
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        mr: 2, 
                        color: 'primary.main',
                        background: 'rgba(25, 118, 210, 0.1)',
                        p: 1,
                        borderRadius: '50%'
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Box>
                      <Typography variant="h4" fontWeight="bold" color="primary">
                        {stat.value}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}