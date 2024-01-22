import { Box, Container, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle1">
            &copy; 2023 - Admin Dashboard
          </Typography>
        </Box>
        <Typography
          sx={{
            pt: { xs: 2, md: 0 }
          }}
          variant="subtitle1"
        >
          Crafted by{' '}
          <Link
            href="https://obelussoft.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            ObelusSoft.com
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;
