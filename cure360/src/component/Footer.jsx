import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  Divider, 
  IconButton,
  useTheme
} from '@mui/material';
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  Instagram as InstagramIcon, 
  LinkedIn as LinkedInIcon 
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'grey.900', 
        color: 'grey.400',
        pt: 8,
        pb: 4
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 'bold', 
                mb: 2, 
                color: 'white',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Box 
                component="span" 
                sx={{ 
                  color: 'primary.main', 
                  mr: 1, 
                  fontSize: 'inherit' 
                }}
              >
                Medi
              </Box>
              Care+
            </Typography>
            <Typography variant="body2" paragraph sx={{ maxWidth: 300 }}>
              Providing comprehensive healthcare services to improve lives and wellbeing. Our mission is to make quality healthcare accessible to everyone.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <IconButton 
                aria-label="Facebook" 
                size="small"
                sx={{ 
                  color: 'grey.400',
                  mr: 1,
                  '&:hover': { color: '#1877F2' }
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                aria-label="Twitter" 
                size="small"
                sx={{ 
                  color: 'grey.400',
                  mr: 1,
                  '&:hover': { color: '#1DA1F2' }
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                aria-label="Instagram" 
                size="small"
                sx={{ 
                  color: 'grey.400',
                  mr: 1,
                  '&:hover': { color: '#E4405F' }
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                aria-label="LinkedIn" 
                size="small"
                sx={{ 
                  color: 'grey.400',
                  '&:hover': { color: '#0A66C2' }
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" color="white" gutterBottom>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {['Home', 'About Us', 'Services', 'Doctors', 'Contact'].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link 
                    href="#" 
                    underline="hover" 
                    color="inherit"
                    sx={{ 
                      display: 'inline-block',
                      transition: '0.2s',
                      '&:hover': { 
                        color: 'primary.main',
                        transform: 'translateX(4px)'
                      }
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={6} sm={4} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" color="white" gutterBottom>
              Services
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {['Find Doctors', 'Hospital Network', 'Ambulance Service', 'Lab Testing', 'Medicine Delivery'].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link 
                    href="#" 
                    underline="hover" 
                    color="inherit"
                    sx={{ 
                      display: 'inline-block',
                      transition: '0.2s',
                      '&:hover': { 
                        color: 'primary.main',
                        transform: 'translateX(4px)'
                      }
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" color="white" gutterBottom>
              Contact Us
            </Typography>
            <Box component="address" sx={{ fontStyle: 'normal' }}>
              <Typography variant="body2" paragraph>
                1234 Healthcare Blvd<br />
                Wellness City, WC 56789
              </Typography>
              <Typography 
                variant="body2" 
                paragraph
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                <Link 
                  href="mailto:contact@medicare-plus.com" 
                  underline="hover" 
                  color="inherit"
                  sx={{ '&:hover': { color: 'primary.main' } }}
                >
                  contact@medicare-plus.com
                </Link>
              </Typography>
              <Typography 
                variant="body2"
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                <Link 
                  href="tel:+15551234567" 
                  underline="hover" 
                  color="inherit"
                  sx={{ '&:hover': { color: 'primary.main' } }}
                >
                  +1 (555) 123-4567
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ borderColor: 'grey.800', my: 4 }} />
        
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          <Typography variant="body2" color="grey.500">
            &copy; {currentYear} MediCare+. All rights reserved.
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 2,
              mt: { xs: 2, sm: 0 } 
            }}
          >
            <Link href="#" underline="hover" color="inherit" variant="body2">
              Privacy Policy
            </Link>
            <Link href="#" underline="hover" color="inherit" variant="body2">
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;