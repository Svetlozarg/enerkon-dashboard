import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Box } from '@mui/material';

export default function ProjectPage() {
  const router = useRouter();
  const { filename } = router.query;

  return (
    <>
      <Head>
        <title>{filename}</title>
        <meta charSet="UTF-8" />
      </Head>

      <Box sx={{ width: '100%', p: '2rem 4rem' }}></Box>
      <Footer />
    </>
  );
}

ProjectPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
