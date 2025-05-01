import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const progress = keyframes`
  0% { width: 0%; }
  70% { width: 100%; }
  100% { width: 100%; }
`;

// Styled Components
const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.98);
  z-index: 1000;
  backdrop-filter: blur(8px);
`;

const BrainIcon = styled.div`
  animation: ${float} 3s ease-in-out infinite;
  margin-bottom: 2rem;
  
  svg {
    width: 80px;
    height: 80px;
    color: #6366f1;
  }
`;

const LoadingText = styled.p`
  font-size: 1.25rem;
  color: #4b5563;
  margin-bottom: 2rem;
  font-weight: 500;
`;

const ProgressContainer = styled.div`
  width: 300px;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  border-radius: 4px;
  animation: ${progress} 3s ease-out forwards;
`;

const StatusMessage = styled.p`
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  font-style: italic;
`;

const messages = [
  "Initializing neural network...",
  "Analyzing medical databases...",
  "Preparing diagnostic models...",
  "Almost ready..."
];

const AI = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  React.useEffect(() => {
    if (iframeLoaded) return;

    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 3000);

    return () => clearInterval(interval);
  }, [iframeLoaded]);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {!iframeLoaded && (
        <LoaderContainer>
          <BrainIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
              <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
              <path d="M15 13a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
              <path d="M12 8v1"/>
              <path d="M12 15v1"/>
            </svg>
          </BrainIcon>
          
          <h3 style={{ fontSize: '1.5rem', color: '#111827', marginBottom: '0.5rem' }}>
            AI Medical Diagnosis
          </h3>
          
          <LoadingText>{messages[currentMessage]}</LoadingText>
          
          <ProgressContainer>
            <ProgressBar />
          </ProgressContainer>
          
          <StatusMessage>Secure connection • HIPAA compliant</StatusMessage>
        </LoaderContainer>
      )}
      
      <iframe
        src="https://doctor-hcdzuayhxju8nzttonzxyo.streamlit.app/?embed=true"
        title="Medical Diagnosis App"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => {
          setTimeout(() => setIframeLoaded(true), 1000);
        }}
        style={{ 
          opacity: iframeLoaded ? 1 : 0, 
          transition: 'opacity 0.5s ease',
          border: 'none'
        }}
      />
    </div>
  );
};

export default AI;