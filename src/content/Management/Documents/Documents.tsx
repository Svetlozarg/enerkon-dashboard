import { Card } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentsTable from './DocumentsTable';
import { RootState } from '@/store/store';
import { fetchDocuments } from '@/store/slices/document/documentSlice';

function Documents() {
 const dispatch = useDispatch()
 const { documents, loading } = useSelector(
  (state: RootState) => state.document
);

useEffect(() => {
  dispatch(fetchDocuments() as any);
}, [dispatch]);

  return (
    <Card>
      <DocumentsTable documents={documents} loading={loading} />
    </Card>
  );
}

export default Documents;
