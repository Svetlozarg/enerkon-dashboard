import { Card, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import ProjectDocumentTable from './ProjectDocumentsTable';
import { RootState } from '@/store/store';
import ProjectLogTable from './ProjectLogTable';

function ProjectDocuments() {
  const { documents, loading } = useSelector(
    (state: RootState) => state.projectDocuments
  );

  return (
    <>
      <Typography
        variant="h1"
        component="h2"
        sx={{
          mt: '1rem',
          mb: '1rem'
        }}
      >
        Таблица с документи
      </Typography>
      <Card>
        <ProjectDocumentTable documents={documents} loading={loading} />
      </Card>
      <Typography
        variant="h1"
        component="h2"
        sx={{
          mt: '3rem',
          mb: '1rem'
        }}
      >
        История
      </Typography>
      <Card
        sx={{
          mt: '1rem'
        }}
      >
        <ProjectLogTable projectId={documents?.[0]?.project} />
      </Card>
    </>
  );
}

export default ProjectDocuments;
