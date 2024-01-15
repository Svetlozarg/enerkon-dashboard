import { ChangeEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/components/SmallComponents/DashboardPageHeader/PageHeader';
import Footer from '@/layouts/Footer';
import {
  Grid,
  Tab,
  Tabs,
  Container,
  Card,
  Box,
  useTheme,
  styled,
  Typography,
  Skeleton
} from '@mui/material';
import PageTitleWrapper from '@/components/SmallComponents/PageTitleWrapper';
import FavouriteProjects from '@/components/PageComponents/Dashboard/FavouriteProjects/FavouriteProjects';
import { getProjects, getProjectsAnalytics } from '@/services/project';
import { Document, Project } from '@/services/apiTypes';
import TotalAnalytics from '@/components/PageComponents/Dashboard/TotalAnalytics/TotalAnalytics';
import { getDocuments } from '@/services/document';
import ProjectAnalytics from '@/components/PageComponents/Dashboard/ProjectAnalytics/ProjectAnalytics';
import ProjectSearch from '@/components/PageComponents/Dashboard/ProjectSearch/ProjectSearch';

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

interface Tabs {
  value: string;
  label: string;
}

const DashboardPage = () => {
  const theme = useTheme();
  const [projectsData, setProjectsData] = useState<Project[]>();
  const [documentsData, setDocumentsData] = useState<Document[]>();
  const [favouriteProjectsData, setFavouriteProjectsData] =
    useState<Project[]>();
  const [projectsAnalyticsData, setProjectsAnalyticsData] =
    useState<Object[]>();
  const [currentTab, setCurrentTab] = useState<string>('analytics');
  const tabs: Tabs[] = [
    { value: 'analytics', label: 'Общ преглед' },
    { value: 'projectSearch', label: 'Търси проект' }
  ];

  useEffect(() => {
    (async () => {
      try {
        const [projectsResponse, documentsResponse, projectsAnalyticsResponse] =
          await Promise.all([
            getProjects(),
            getDocuments(),
            getProjectsAnalytics()
          ]);

        const [projectsData, documentsData, projectsAnalyticsData] = [
          projectsResponse.data,
          documentsResponse.data,
          projectsAnalyticsResponse.data
        ];

        if (
          !projectsResponse.success ||
          !documentsResponse.success ||
          !projectsAnalyticsResponse.success
        ) {
          return;
        }

        const favoriteProjects = projectsData.filter(
          (project: Project) => project.favourite === true
        );

        const filteredProjectsAnalyticsData: Object[] = [
          {
            name: 'Платени проекти',
            data: projectsAnalyticsData.paid
          },
          {
            name: 'Неплатени проекти',
            data: projectsAnalyticsData.unpaid
          }
        ];

        setProjectsData(projectsData);
        setDocumentsData(documentsData);
        setFavouriteProjectsData(favoriteProjects);
        setProjectsAnalyticsData(filteredProjectsAnalyticsData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
            onChange={(_event: ChangeEvent<{}>, value: string): void => {
              setCurrentTab(value);
            }}
            value={currentTab}
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={
                  <Typography component="p" variant="h4">
                    {tab.label}
                  </Typography>
                }
                value={tab.value}
              />
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
                <Grid item xs={12} p={4}>
                  <FavouriteProjects
                    favouriteProjectsData={favouriteProjectsData}
                    setFavouriteProjectsData={setFavouriteProjectsData}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  p={4}
                  sx={{
                    background: `${theme.colors.alpha.black[5]}`,
                    borderTop: `1px solid ${theme.colors.alpha.black[10]}`
                  }}
                >
                  <Grid container spacing={4}>
                    {projectsAnalyticsData ? (
                      <Grid item xs={12} sm={6} md={8}>
                        <ProjectAnalytics
                          projectsAnalyticsData={projectsAnalyticsData}
                        />
                      </Grid>
                    ) : (
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width={760}
                        height={300}
                        sx={{ my: 2, ml: 4, borderRadius: '10px' }}
                      />
                    )}

                    {projectsData && documentsData ? (
                      <Grid item xs={12} sm={6} md={4}>
                        <TotalAnalytics
                          totalProjects={projectsData.length}
                          totalDocuments={documentsData.length}
                        />
                      </Grid>
                    ) : (
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width={374}
                        height={300}
                        sx={{ my: 2, ml: 2, borderRadius: '10px' }}
                      />
                    )}
                  </Grid>
                </Grid>
              </>
            )}

            {currentTab === 'projectSearch' && (
              <Grid item xs={12} p={4}>
                <ProjectSearch
                  projects={projectsData}
                  documents={documentsData}
                />
              </Grid>
            )}
          </Grid>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

DashboardPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardPage;
