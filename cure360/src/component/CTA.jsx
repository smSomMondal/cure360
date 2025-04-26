import React from 'react';
import { Box, Container, Typography, Button, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const CTASection = () => {
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Box 
      sx={{ 
        position: 'relative',
        py: 10,
        bgcolor: 'primary.main',
        color: 'white',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 150%, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0) 50%)',
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={8} textAlign="center">
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h3" 
                  component="h2" 
                  fontWeight="bold" 
                  gutterBottom
                >
                  Ready to experience better healthcare?
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h6" 
                  sx={{ mb: 4, opacity: 0.9, maxWidth: 700, mx: 'auto' }}
                >
                  Download our app or register online to access all our services from anywhere, anytime.
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' }, 
                    gap: 2, 
                    justifyContent: 'center' 
                  }}
                >
                  <Button 
                    variant="contained" 
                    size="large"
                    disableElevation
                    sx={{ 
                      bgcolor: 'white', 
                      color: 'primary.main',
                      fontWeight: 'bold',
                      px: 4,
                      '&:hover': { 
                        bgcolor: 'rgba(255,255,255,0.9)'
                      }
                    }}
                  >
                    Get Started
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    sx={{ 
                      borderColor: 'white', 
                      color: 'white',
                      fontWeight: 'bold',
                      px: 4,
                      '&:hover': { 
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)' 
                      }
                    }}
                  >
                    Contact Us
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
      
      {/* Animated background elements */}
      <Box 
        component={motion.div}
        animate={{ 
          y: [0, -15, 0], 
          x: [0, 10, 0],
          rotate: [0, 5, 0] 
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        sx={{ 
          position: 'absolute', 
          width: 300, 
          height: 300, 
          borderRadius: '50%', 
          backgroundColor: 'rgba(255,255,255,0.03)', 
          top: -100, 
          right: -100,
          zIndex: 0
        }}
      />
      
      <Box 
        component={motion.div}
        animate={{ 
          y: [0, 20, 0], 
          x: [0, -15, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        sx={{ 
          position: 'absolute', 
          width: 200, 
          height: 200, 
          borderRadius: '50%', 
          backgroundColor: 'rgba(255,255,255,0.05)', 
          bottom: -50, 
          left: -50,
          zIndex: 0
        }}
      />
    </Box>
  );
};

export default CTASection;