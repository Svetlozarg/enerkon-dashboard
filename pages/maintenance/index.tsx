import { Box, Typography, Container, Divider, styled } from '@mui/material';
import type { ReactElement } from 'react';
import BaseLayout from '@/layouts/BaseLayout';
import Head from 'next/head';
import Logo from '@/components/SmallComponents/LogoSign';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
`
);

const TopWrapper = styled(Box)(
  ({ theme }) => `
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(6)};
`
);

function StatusMaintenance() {
  return (
    <>
      <Head>
        <title>Status - Maintenance</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="md">
            <Logo />
            <Box textAlign="center">
              <Container maxWidth="xs">
                <Typography variant="h2" sx={{ mt: 4, mb: 2 }}>
                  В момента сайтът е спрян за поддръжка
                </Typography>
                <Typography
                  variant="h3"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{ mb: 4 }}
                >
                  Извиняваме се за причинените неудобства.
                </Typography>
              </Container>
              <img
                alt="Maintenance"
                height={250}
                src="/static/images/status/maintenance.svg"
              />
            </Box>
            <Divider sx={{ my: 4 }} />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="text.primary"
                >
                  Енеркон ЕООД
                </Typography>
              </Box>

              <Typography>Crafted by ObelusSoft</Typography>
            </Box>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

export default StatusMaintenance;

StatusMaintenance.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
