// src/theme/animations.js
export const framerMotionConfig = {
    // Page transition variants
    pageVariants: {
      initial: {
        opacity: 0,
        y: 20
      },
      in: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.43, 0.13, 0.23, 0.96]
        }
      },
      out: {
        opacity: 0,
        y: -20,
        transition: {
          duration: 0.3,
          ease: [0.43, 0.13, 0.23, 0.96]
        }
      }
    },
    
    // Staggered list animations
    listVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      }
    },
    
    // Item animations
    itemVariants: {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" }
      }
    },
    
    // Card hover animations
    cardHover: {
      scale: 1.02,
      y: -5,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    },
    
    // Fade in and slide up
    fadeInUp: {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
      }
    },
    
    // Simple fade in
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.5 }
      }
    },
    
    // Pulse animation for buttons or badges
    pulse: {
      scale: [1, 1.03, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    
    // Background bubble animations for hero sections
    bubbleFloat: {
      y: [0, -15, 0],
      x: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    
    // Text reveal animation
    textReveal: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 50,
          damping: 10
        }
      }
    },
    
    // Button hover animation
    buttonHover: {
      scale: 1.05,
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    
    // Image zoom effect
    imageZoom: {
      scale: 1.1,
      transition: { duration: 0.4 }
    },
    
    // Utilities for hover effects
    hoverScale: {
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    
    // Entrance animations for modals
    modalEnter: {
      hidden: { opacity: 0, scale: 0.9, y: 20 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25
        }
      },
      exit: {
        opacity: 0,
        scale: 0.9,
        y: 20,
        transition: { duration: 0.2 }
      }
    }
  };