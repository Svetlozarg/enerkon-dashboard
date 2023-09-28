import { Card } from '@mui/material';
import { useSelector } from 'react-redux';
import ProjectDocumentTable from './ProjectDocumentsTable';
import { RootState } from '@/store/store';

function ProjectDocuments() {
  const { documents, loading } = useSelector(
    (state: RootState) => state.projectDocuments
  );

  return (
    <Card>
      <ProjectDocumentTable documents={documents} loading={loading} />
    </Card>
  );
}

export default ProjectDocuments;
