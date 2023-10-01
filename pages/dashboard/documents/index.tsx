import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/Documents/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import Documents from '@/content/Management/Documents/Documents';

function DashboardProjects() {
  return (
    <>
      <Head>
        <title>Документи</title>
        <meta charSet="UTF-8" />
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Documents />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

DashboardProjects.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardProjects;
