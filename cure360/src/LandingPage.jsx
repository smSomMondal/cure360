// App.jsx
import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import HeroSection from './component/HeroSection';
import ServicesSection from './component/Services';
import WhyChooseUsSection from './component/WhyChooseUs';
import CTASection from './component/CTA';

let theme = createTheme({
  palette: {
    primary: {
      main: '#009688',
      light: '#4DB6AC',
      dark: '#00796B',
      contrastText: '#fff',
    },
    secondary: {
      main: '#1976D2',
      light: '#64B5F6',
      dark: '#0D47A1',
      contrastText: '#fff',
    },
    background: {
      default: '#F5F7FA',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: 'none',
        },
        contained: {
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <ServicesSection />
            <WhyChooseUsSection />
            <CTASection />
          </>
        } />
        <Route path="/Location" element={<div>Location Page Content</div>} />
        <Route path="/patientform" element={<div>Patient Form Content</div>} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
