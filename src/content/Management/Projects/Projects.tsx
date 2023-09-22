import { useEffect } from 'react';
import { Card } from '@mui/material';
import ProjectsTable from './ProjectsTable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { fetchProjects } from '@/store/slices/project/projectSlice';

function Projects() {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector(
    (state: RootState) => state.project
  );

  useEffect(() => {
    dispatch(fetchProjects() as any);
  }, [dispatch]);
  return (
    <Card>
      <ProjectsTable projects={projects} loading={loading} />
    </Card>
  );
}

export default Projects;
