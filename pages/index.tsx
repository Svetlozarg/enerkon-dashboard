import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { ChangeEvent, useEffect, useState } from 'react';
import PageHeader from '@/content/Dashboards/Tasks/PageHeader';
import Footer from '@/components/Footer';
import {
  Grid,
  Tab,
  Tabs,
  Divider,
  Container,
  Card,
  Box,
  useTheme,
  styled
} from '@mui/material';
import PageTitleWrapper from '@/components/PageTitleWrapper';

import TasksAnalytics from '@/content/Dashboards/Tasks/TasksAnalytics';
import Performance from '@/content/Dashboards/Tasks/Performance';
import Projects from '@/content/Dashboards/Tasks/Projects';
import TaskSearch from '@/content/Dashboards/Tasks/TaskSearch';
import { useDispatch } from 'react-redux';
import { fetchProjects } from '@/store/slices/project/projectSlice';
import { fetchDocuments } from '@/store/slices/document/documentSlice';

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
      padding: 0 ${theme.spacing(2)};
      position: relative;
      bottom: -1px;

      .MuiTabs-root {
        height: 44px;
        min-height: 44px;
      }

      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }

      .MuiTabs-indicator {
          min-height: 4px;
          height: 4px;
          box-shadow: none;
          bottom: -4px;
          background: none;
          border: 0;

          &:after {
            position: absolute;
            left: 50%;
            width: 28px;
            content: ' ';
            margin-left: -14px;
            background: ${theme.colors.primary.main};
            border-radius: inherit;
            height: 100%;
          }
      }

      .MuiTab-root {
          &.MuiButtonBase-root {
              height: 44px;
              min-height: 44px;
              background: ${theme.colors.alpha.white[50]};
              border: 1px solid ${theme.colors.alpha.black[10]};
              border-bottom: 0;
              position: relative;
              margin-right: ${theme.spacing(1)};
              font-size: ${theme.typography.pxToRem(14)};
              color: ${theme.colors.alpha.black[80]};
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;

              .MuiTouchRipple-root {
                opacity: .1;
              }

              &:after {
                position: absolute;
                left: 0;
                right: 0;
                width: 100%;
                bottom: 0;
                height: 1px;
                content: '';
                background: ${theme.colors.alpha.black[10]};
              }

              &:hover {
                color: ${theme.colors.alpha.black[100]};
              }
          }

          &.Mui-selected {
              color: ${theme.colors.alpha.black[100]};
              background: ${theme.colors.alpha.white[100]};
              border-bottom-color: ${theme.colors.alpha.white[100]};

              &:after {
                height: 0;
              }
          }
      }
  `
);

function DashboardTasks() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState<string>('analytics');

  const tabs = [
    { value: 'analytics', label: 'Общ преглед' },
    { value: 'taskSearch', label: 'Търси проект' }
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  useEffect(() => {
    dispatch(fetchProjects() as any);
    dispatch(fetchDocuments() as any);
  }, [dispatch]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Enerkon - Табло за управление</title>
      </Head>

      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Container maxWidth="lg">
        <TabsContainerWrapper>
          <Tabs
            onChange={handleTabsChange}
            value={currentTab}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </TabsContainerWrapper>
        <Card variant="outlined">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={0}
          >
            {currentTab === 'analytics' && (
              <>
                <Grid item xs={12}>
                  <Box p={4}>
                    <Projects />
                  </Box>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                  <Box
                    p={4}
                    sx={{
                      background: `${theme.colors.alpha.black[5]}`
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6} md={8}>
                        <TasksAnalytics />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Performance />
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider />
                </Grid>
              </>
            )}
            {currentTab === 'taskSearch' && (
              <Grid item xs={12}>
                <Box p={4}>
                  <TaskSearch />
                </Box>
              </Grid>
            )}
          </Grid>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
