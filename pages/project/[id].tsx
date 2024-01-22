import { useEffect, useState } from 'react';
import Footer from '@/layouts/Footer';
import { useRouter } from 'next/router';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/SmallComponents/PageTitleWrapper';
import PageHeader from '@/components/SmallComponents/PageHeader/PageHeader';
import { Container, Grid, Stack, Typography } from '@mui/material';
import DocumentsTable from '@/components/PageComponents/Document/DocumentsTable';
import MUITable from '@/components/MuiComponents/MUITable';
import { GridColDef } from '@mui/x-data-grid';
import { formatDate } from '@/helpers/helpers';
import { signOut } from '@/services/auth';
import { callApi } from '@/services/callApi';
import {
  GetProjectDocumentsDataSnippet,
  GetProjectLogSnippet,
  GetProjectSnippet
} from '@/services/Projects/apiProjectsSnippets';
import {
  getProjectById,
  getProjectDocuments,
  getProjectLog
} from '@/services/Projects/apiProjects';
import {
  Project,
  ProjectAnalytics
} from '@/services/Projects/apiProjectsTypes';
import { Document } from '@/services/Documents/apiDocumentsTypes';

const projectLogColumns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Заглавие',
    width: 300,
    sortable: false,
    renderCell: (params) => {
      return params.row.title;
    }
  },
  {
    field: 'action',
    headerName: 'Действие',
    width: 300,
    sortable: false,
    renderCell: (params) => {
      return params.row.action;
    }
  },
  {
    field: 'date',
    headerName: 'Дата',
    width: 200,
    sortable: false,
    valueGetter: (params) => {
      if (!params.row.date) {
        return params.row.date;
      }
      return formatDate(params.row.date);
    }
  }
];

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;
  const [projectData, setProjectData] = useState<Project>();
  const [projectDocumentsData, setProjectDocumentsData] =
    useState<Document[]>();
  const [projectLogData, setProjectLogData] = useState<ProjectAnalytics>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        if (!id) return;

        const projectData = await callApi<GetProjectSnippet>({
          query: getProjectById(id.toString())
        });

        const projectDocumentsData =
          await callApi<GetProjectDocumentsDataSnippet>({
            query: getProjectDocuments(id.toString())
          });

        const projectLogData = await callApi<GetProjectLogSnippet>({
          query: getProjectLog(id.toString())
        });

        if (projectData.success) {
          setProjectData(projectData.data);

          if (projectDocumentsData.success) {
            setProjectDocumentsData(projectDocumentsData.data);
          }

          if (projectLogData.success) {
            setProjectLogData(projectLogData.data[0].log.reverse());
          }

          setLoading(false);
        } else {
          signOut();
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

        <Container maxWidth="lg">
          <Grid item xs={12}>
            <Typography component="h4" variant="h3" mb={2}>
              Документи
            </Typography>

            <DocumentsTable
              loading={loading}
              setLoading={setLoading}
              initialProjectDocumentsData={projectDocumentsData}
              singleProject
            />
          </Grid>

          <Grid item xs={12} mt={8}>
            <Typography component="h4" variant="h3" mb={2}>
              История
            </Typography>

            <MUITable
              rows={projectLogData as any}
              columns={projectLogColumns}
              loading={loading}
            />
          </Grid>
        </Container>
      </Stack>
      <Footer />
    </>
  );
}

ProjectPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
