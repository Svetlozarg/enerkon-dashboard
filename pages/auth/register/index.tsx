import Footer from '@/components/Footer';
import Register from '@/components/Register';
import { Container } from '@mui/material';
import Head from 'next/head';

function RegisterPage() {
  return (
    <>
      <Head>
        <title>Enerkon - Register</title>
      </Head>
      <Container sx={{ mt: 3}} maxWidth="lg">
        <Register />
      </Container>
      <Footer />
    </>
  );
}

export default RegisterPage;
