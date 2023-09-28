import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../store';
import { getProjectDocuments } from '@/services/project';

export interface Document {
  id: string;
  title: string;
  document: string;
  project: string;
  type: string;
  status: string;
}

interface DocumentState {
  documents: Document[];
  loading: boolean;
  error: string | null;
}

const initialState: DocumentState = {
  documents: [],
  loading: false,
  error: null
};

const projectDocumentsSlice = createSlice({
  name: 'projectDocuments',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setDocument: (state, action: PayloadAction<Document[]>) => {
      state.documents = action.payload;
    }
  }
});

export const { setLoading, setError, setDocument } =
  projectDocumentsSlice.actions;

export const fetchProjectDocuments =
  (projectId: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = getProjectDocuments(projectId);
      if (!response) {
        throw new Error('Failed to fetch documents');
      }

      const documentsData: Document[] = await response;

      dispatch(setDocument((documentsData as any).data));
    } catch (error) {
      dispatch(setError(error.message || 'An error occurred'));
    } finally {
      dispatch(setLoading(false));
    }
  };

export default projectDocumentsSlice.reducer;
