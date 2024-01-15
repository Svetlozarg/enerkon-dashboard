import { useEffect, useState } from 'react';
import Footer from '@/layouts/Footer';
import { useRouter } from 'next/router';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/SmallComponents/PageTitleWrapper';
import PageHeader from '@/components/SmallComponents/PageHeader/PageHeader';
import { Project } from '@/services/apiTypes';
import {
  getProjectDocuments,
  getProjectId,
  getProjectLog
} from '@/services/project';
import {
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import DocumentsTable from '@/components/PageComponents/Document/DocumentsTable';
import MUITable from '@/components/MuiComponents/MUITable';
import { GridColDef } from '@mui/x-data-grid';
import { formatDate } from '@/helpers/helpers';

const projectLogColumns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Заглавие',
    width: 300,
    sortable: false,
    renderCell: (params) => {
      return params.row.log[0].title;
    }
  },
  {
    field: 'action',
    headerName: 'Действие',
    width: 300,
    sortable: false,
    renderCell: (params) => {
      return params.row.log[0].action;
    }
  },
  {
    field: 'date',
    headerName: 'Дата',
    width: 200,
    sortable: false,
    valueGetter: (params) => {
      if (!params.row.log[0].date) {
        return params.row.log[0].date;
      }
      return formatDate(params.row.log[0].date);
    }
  }
];

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;
  const [projectData, setProjectData] = useState<Project>();
  const [projectDocumentsData, setProjectDocumentsData] = useState<any>();
  const [projectLogData, setProjectLogData] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        if (!id) return;

        const projectData = await getProjectId(id as string);

        if (projectData.success) {
          setProjectData(projectData.data);

          const projectDocumentsData = await getProjectDocuments(id as string);

          const projectLogData = await getProjectLog(id as string);

          const sortedProjectLogData = projectLogData.data.sort(
            (a: any, b: any) =>
              (new Date(b.log[0].date) as any) -
              (new Date(a.log[0].date) as any)
          );

          if (projectDocumentsData.success) {
            setProjectDocumentsData(projectDocumentsData.data);
          }

          if (projectLogData.success) {
            setProjectLogData(sortedProjectLogData);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <>
      <Head>
        <title>{projectData ? projectData.title : 'Зареждане...'}</title>
        <meta charSet="UTF-8" />
      </Head>
      <Stack>
        <PageTitleWrapper>
          <PageHeader
            title={projectData ? projectData.title : 'Зареждане...'}
            subtitle="Преглеждане на проект"
          />
        </PageTitleWrapper>

        {projectDocumentsData && projectLogData ? (
          <Container maxWidth="lg">
            <Grid item xs={12}>
              <Typography component="h4" variant="h3" mb={2}>
                Документи
              </Typography>

              <DocumentsTable
                initialProjectDocumentsData={projectDocumentsData}
                singleProject
              />
            </Grid>

            <Grid item xs={12} mt={8}>
              <Typography component="h4" variant="h3" mb={2}>
                История
              </Typography>

              <MUITable
                rows={projectLogData}
                columns={projectLogColumns}
                loading={!projectLogData ? true : false}
              />
            </Grid>
          </Container>
        ) : (
          <Stack justifyContent="center" alignItems="center" height={600}>
            <CircularProgress size={100} />
          </Stack>
        )}
      </Stack>
      <Footer />
    </>
  );
}

ProjectPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
