import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper,
  useTheme 
} from '@mui/material';
import { 
  VerifiedUser as CheckCircleIcon, 
  AccessTime as ClockIcon, 
  LocationOn as MapPinIcon, 
  Star as StarIcon 
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <CheckCircleIcon fontSize="large" />,
    title: "Verified Professionals",
    description: "All our doctors and healthcare providers are certified and thoroughly verified.",
    color: "#00BCD4"
  },
  {
    icon: <ClockIcon fontSize="large" />,
    title: "24/7 Service",
    description: "Round-the-clock service for emergencies and medical consultations whenever you need.",
    color: "#3F51B5"
  },
  {
    icon: <MapPinIcon fontSize="large" />,
    title: "Wide Coverage",
    description: "Extensive network covering multiple locations for your convenience.",
    color: "#4CAF50"
  },
  {
    icon: <StarIcon fontSize="large" />,
    title: "Quality Assured",
    description: "High standards of healthcare with focus on patient satisfaction and outcomes.",
    color: "#FFC107"
  }
];

const WhyChooseUsSection = () => {
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Box sx={{ py: 10, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            component="h2" 
            variant="h3" 
            fontWeight="bold"
            color="text.primary"
            gutterBottom
          >
            Why Choose MediCare+
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            We're dedicated to providing the highest quality healthcare with convenience and care.
          </Typography>
        </Box>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={itemVariants}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: 4,
                      height: '100%',
                      borderRadius: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 8
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        color: feature.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        p: 1.5,
                        borderRadius: '50%',
                        bgcolor: `${feature.color}15`
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      fontWeight="bold" 
                      gutterBottom
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default WhyChooseUsSection;