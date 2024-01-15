import { useEffect, useState } from 'react';
import PageHeader from '@/components/SmallComponents/PageHeader/PageHeader';
import PageTitleWrapper from '@/components/SmallComponents/PageTitleWrapper';
import Footer from '@/layouts/Footer';
import SidebarLayout from '@/layouts/SidebarLayout';
import { CircularProgress, Container, Grid, Stack } from '@mui/material';
import Head from 'next/head';
import { getDocuments } from '@/services/document';
import { Document, Project } from '@/services/apiTypes';
import DocumentsTable from '@/components/PageComponents/Document/DocumentsTable';
import AddDocumentModalContent from '@/components/PageComponents/Document/AddDocumentModalContent';
import Modal from '@/components/MuiComponents/Modal';
import { getProjects } from '@/services/project';

const DocumentsPage = () => {
  const [projectsData, setProjectsData] = useState<Project[]>();
  const [documentsData, setDocumentsData] = useState<Document[]>();
  const [openDocumentModal, setOpenDocumentModal] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const projectsData = await getProjects();
        const documentsData = await getDocuments();

        if (projectsData.success) {
          setProjectsData(projectsData.data);
        }

        if (documentsData.success) {
          setDocumentsData(documentsData.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Документи</title>
        <meta charSet="UTF-8" />
      </Head>
      <PageTitleWrapper>
        <PageHeader
          title="Документи"
          subtitle="Всички документи на едно място"
          modal={
            <Modal
              modalTitle="Добави документ"
              open={openDocumentModal}
              setOpen={setOpenDocumentModal}
            >
              <AddDocumentModalContent
                projectsData={projectsData}
                setDocumentsData={setDocumentsData}
                openDocumentModal={openDocumentModal}
                setOpenDocumentModal={setOpenDocumentModal}
              />
            </Modal>
          }
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid item xs={12}>
          {documentsData ? (
            <DocumentsTable
              initialProjectDocumentsData={documentsData}
              singleProject={false}
            />
          ) : (
            <Stack justifyContent="center" alignItems="center" height={600}>
              <CircularProgress size={100} />
            </Stack>
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

DocumentsPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DocumentsPage;
