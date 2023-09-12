import Footer from '@/components/Footer';
import Login from '@/components/Login';
import { Container } from '@mui/material';
import Head from 'next/head';

function DashboardProjects() {
  return (
    <>
      <Head>
        <title>Enerkon - Login</title>
      </Head>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Login />
      </Container>
      <Footer />
    </>
  );
}

export default DashboardProjects;
