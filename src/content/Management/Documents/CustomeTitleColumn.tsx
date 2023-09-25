import { useEffect, useState } from 'react';
import { getProjectId } from '@/services/project';

interface Props {
  id: string;
}

export default function CustomTitleColumn(props: Props) {
  const { id } = props;
  const [project, setProject] = useState(null);

  useEffect(() => {
    getProjectId(id)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  return <div>{project ? project.title : 'Зареждане...'}</div>;
}
