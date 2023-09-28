import { Card } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectDocumentTable from './ProjectDocumentsTable';
import { RootState } from '@/store/store';
import { fetchDocuments } from '@/store/slices/document/documentSlice';

function ProjectDocuments() {
  const dispatch = useDispatch();
  const { documents, loading } = useSelector(
    (state: RootState) => state.document
  );

  useEffect(() => {
    dispatch(fetchDocuments() as any);
  }, [dispatch]);

  return (
    <Card>
      <ProjectDocumentTable documents={documents} loading={loading} />
    </Card>
  );
}

export default ProjectDocuments;
