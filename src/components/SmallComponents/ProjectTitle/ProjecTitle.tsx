import { useEffect, useState } from 'react';
import { getProjectId } from '@/services/project';

interface ProjectTitleProps {
  projectId: string;
}

const ProjectTitle: React.FC<ProjectTitleProps> = ({ projectId }) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    getProjectId(projectId)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [projectId]);

  return <div>{project ? project.title : 'Зареждане...'}</div>;
};

export default ProjectTitle;
