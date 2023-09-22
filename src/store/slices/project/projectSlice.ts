import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../store';
import { getProjects } from '@/services/project';

export interface Project {
  id: string;
  title: string;
}

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    }
  }
});

export const { setLoading, setError, setProjects } = projectSlice.actions;

export const fetchProjects = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const response = getProjects();
    if (!response) {
      throw new Error('Failed to fetch projects');
    }

    const projectsData: Project[] = await response;

    console.log(projectsData);

    dispatch(setProjects((projectsData as any).data));
  } catch (error) {
    dispatch(setError(error.message || 'An error occurred'));
  } finally {
    dispatch(setLoading(false));
  }
};

export default projectSlice.reducer;
