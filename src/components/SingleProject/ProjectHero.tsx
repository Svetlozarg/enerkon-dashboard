// components/Hero.tsx
import React from 'react';
import { Box, Typography, Container } from '@mui/material';

interface HeroProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ backgroundImage, title, subtitle }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" paragraph>
          {subtitle}
        </Typography>
      </Container>
    </Box>
    
  );
};

export default Hero;
