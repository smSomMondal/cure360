import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Container,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accountMenu, setAccountMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { text: 'Home', path: '#' },
    { text: 'Location', path: '/Location' },
    { text: 'Services', path: '#' },
    { text: 'About', path: '#' },
    { text: 'Doctors', path: '#' },
    { text: 'Contact', path: '#' }
  ];

  const handleAccountMenuOpen = (event) => {
    setAccountMenu(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenu(null);
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'white',
          boxShadow: scrolled ? 2 : 0,
          transition: 'all 0.3s ease'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ 
                  fontWeight: 700, 
                  color: 'text.primary',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.main', 
                    width: 32, 
                    height: 32, 
                    mr: 1 
                  }}
                >
                  cu
                </Avatar>
                Cure360
              </Typography>
            </motion.div>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Button
                    component={Link}
                    to={item.path}
                    sx={{ 
                      mx: 1, 
                      color: 'text.primary',
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.04)',
                        color: 'primary.main'
                      }
                    }}
                  >
                    {item.text}
                  </Button>
                </motion.div>
              ))}
            </Box>

            {/* Sign In Button (Desktop) */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button
                  component={Link}
                  to="/patientform"
                  variant="contained"
                  color="primary"
                  startIcon={<AccountCircle />}
                  sx={{ borderRadius: 2 }}
                >
                  Sign In
                </Button>
              </motion.div>
            </Box>

            {/* Mobile Menu Icon */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
              <IconButton
                size="large"
                onClick={() => setDrawerOpen(true)}
                sx={{ 
                  color: 'text.primary' 
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Spacer to prevent overlap with content */}
      <Toolbar />

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, pt: 2 }}>
          <Typography variant="h6" sx={{ px: 2, py: 1, fontWeight: 700, color: 'primary.main' }}>
            Cure360
          </Typography>
          
          <List>
            {menuItems.map((item) => (
              <ListItem 
                button 
                key={item.text}
                component={Link}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <ListItem>
              <Button
                component={Link}
                to="/patientform"
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<AccountCircle />}
              >
                Sign In
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Account Menu */}
      <Menu
        anchorEl={accountMenu}
        open={Boolean(accountMenu)}
        onClose={handleAccountMenuClose}
      >
        <MenuItem onClick={handleAccountMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleAccountMenuClose}>My Account</MenuItem>
        <MenuItem onClick={handleAccountMenuClose}>Logout</MenuItem>
      </Menu>
    </>
  );
}
