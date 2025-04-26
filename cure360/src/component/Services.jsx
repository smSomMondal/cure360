import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider
} from '@mui/material';
import { 
  Person as UserIcon, 
  LocalHospital as HospitalIcon, 
  Emergency as AmbulanceIcon, 
  Science as BeakerIcon,
  LocalPharmacy as ShoppingBagIcon,
  PhoneInTalk as PhoneIcon,
  ChevronRight,
  ArrowForward
} from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function Services() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [hoveredService, setHoveredService] = useState(null);
  
  // Service data
  const services = [
    {
      id: 1,
      title: "Find Doctors",
      description: "Connect with the best specialists and general physicians in your area. Book appointments online.",
      icon: <UserIcon fontSize="large" />,
      color: "#1e88e5",
      link: "#"
    },
    {
      id: 2,
      title: "Hospital Network",
      description: "Access our wide network of partnered hospitals and healthcare facilities for your treatment needs.",
      icon: <HospitalIcon fontSize="large" />,
      color: "#009688",
      link: "#"
    },
    {
      id: 3,
      title: "Emergency Ambulance",
      description: "24/7 ambulance service with trained paramedics for emergency medical transportation.",
      icon: <AmbulanceIcon fontSize="large" />,
      color: "#e53935",
      link: "#"
    },
    {
      id: 4,
      title: "Lab Testing",
      description: "Book diagnostic tests from accredited laboratories with home sample collection option.",
      icon: <BeakerIcon fontSize="large" />,
      color: "#8e24aa",
      link: "#"
    },
    {
      id: 5,
      title: "Medicine Delivery",
      description: "Order prescription and OTC medicines online with fast home delivery from certified pharmacies.",
      icon: <ShoppingBagIcon fontSize="large" />,
      color: "#43a047",
      link: "#"
    },
    {
      id: 6,
      title: "Teleconsultation",
      description: "Connect with doctors virtually through video calls for convenient healthcare from your home.",
      icon: <PhoneIcon fontSize="large" />,
      color: "#fb8c00",
      link: "#"
    }
  ];

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Box 
      sx={{ 
        py: 10, 
        background: 'white',
        position: 'relative'
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Typography 
              variant="overline" 
              component="p" 
              color="primary"
              fontWeight="medium"
              letterSpacing={2}
            >
              COMPREHENSIVE CARE
            </Typography>
            
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              Our Services
            </Typography>
            
            <Divider 
              sx={{ 
                width: '80px', 
                borderColor: 'primary.main',
                borderWidth: 2,
                borderRadius: 1,
                mx: 'auto',
                mb: 3
              }} 
            />
            
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ maxWidth: 700, mx: 'auto' }}
            >
              Comprehensive healthcare solutions to meet all your medical needs in one integrated platform.
            </Typography>
          </motion.div>
        </Box>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={3}>
            {services.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <motion.div 
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <Card 
                    elevation={hoveredService === service.id ? 8 : 2}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-10px)'
                      }
                    }}
                  >
                    {/* Colored top border */}
                    <Box 
                      sx={{ 
                        height: 6, 
                        width: '100%', 
                        bgcolor: service.color 
                      }} 
                    />
                    
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box 
                        sx={{ 
                          display: 'flex',
                          justifyContent: 'center',
                          mb: 3
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: `${service.color}15`,
                            color: service.color,
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',
                            transform: hoveredService === service.id ? 'scale(1.1)' : 'scale(1)'
                          }}
                        >
                          {service.icon}
                        </Box>
                      </Box>
                      
                      <Typography 
                        variant="h5" 
                        component="h3" 
                        gutterBottom
                        fontWeight="bold"
                        textAlign="center"
                      >
                        {service.title}
                      </Typography>
                      
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        textAlign="center"
                        sx={{ mb: 2 }}
                      >
                        {service.description}
                      </Typography>
                    </CardContent>
                    
                    <CardActions sx={{ p: 2, pt: 0, justifyContent: 'center' }}>
                      <Button 
                        href={service.link}
                        color="primary"
                        endIcon={<ArrowForward />}
                        sx={{ 
                          textTransform: 'none',
                          fontWeight: 'medium'
                        }}
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
        
        <Box 
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            mt: 6
          }}
        >
          <Button 
            variant="contained" 
            color="primary"
            size="large"
            endIcon={<ChevronRight />}
            sx={{ 
              borderRadius: 2,
              px: 4,
              py: 1
            }}
          >
            View All Services
          </Button>
        </Box>
      </Container>
    </Box>
  );
}