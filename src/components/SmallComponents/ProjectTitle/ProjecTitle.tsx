import { useEffect, useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import { getProjectId } from '@/services/project';
import { Project } from '@/services/apiTypes';

interface ProjectTitleProps {
  projectId: string;
}

const ProjectTitle: React.FC<ProjectTitleProps> = ({ projectId }) => {
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    (async () => {
      if (projectId) {
        try {
          const project = await getProjectId(projectId);

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
