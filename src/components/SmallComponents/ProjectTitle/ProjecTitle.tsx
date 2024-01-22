import { useEffect, useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import { Project } from '@/services/Projects/apiProjectsTypes';
import { callApi } from '@/services/callApi';
import { getProjectById } from '@/services/Projects/apiProjects';
import { GetProjectSnippet } from '@/services/Projects/apiProjectsSnippets';

interface ProjectTitleProps {
  projectId: string;
}

const ProjectTitle: React.FC<ProjectTitleProps> = ({ projectId }) => {
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    (async () => {
      if (projectId) {
        try {
          const project = await callApi<GetProjectSnippet>({
            query: getProjectById(projectId)
          });

          if (project.success) {
            setProject(project.data);
          }
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, [projectId]);

  return (
    <Box>
      {project ? (
        project.title
      ) : (
        <Skeleton
          variant="rectangular"
          width={100}
          height={15}
          animation="wave"
        />
      )}
    </Box>
  );
};

export default ProjectTitle;
