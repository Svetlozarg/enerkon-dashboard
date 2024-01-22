import { useState } from 'react';
import {
  Button,
  Grid,
  Pagination,
  Skeleton,
  Stack,
  Typography
} from '@mui/material';
import Link from 'next/link';
import FavouriteProjectCard from './FavouriteProjectCard';
import { Project } from '@/services/Projects/apiProjectsTypes';

interface FavouriteProjectsProps {
  favouriteProjectsData: Project[];
  setFavouriteProjectsData: React.Dispatch<React.SetStateAction<Project[]>>;
}

const FavouriteProjects: React.FC<FavouriteProjectsProps> = ({
  favouriteProjectsData,
  setFavouriteProjectsData
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsPerPage = 3;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects =
    favouriteProjectsData &&
    favouriteProjectsData.slice(indexOfFirstProject, indexOfLastProject);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <Stack gap={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography component="h3" variant="h2">
          Проекти
        </Typography>

        <Link href="/projects">
          <Button variant="outlined">Виж всички проекти</Button>
        </Link>
      </Stack>

      {favouriteProjectsData ? (
        <Grid container spacing={2}>
          {currentProjects.map((project) => (
            <Grid key={project._id} item xs={12} sm={6} md={5} lg={4}>
              <FavouriteProjectCard
                project={project}
                setFavouriteProjectsData={setFavouriteProjectsData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </Grid>
          ))}

          {favouriteProjectsData.length > projectsPerPage && (
            <Stack
              width="100%"
              justifyContent="center"
              alignItems="center"
              my={3}
            >
              <Pagination
                count={Math.ceil(
                  favouriteProjectsData.length / projectsPerPage
                )}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          )}
        </Grid>
      ) : (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={400}
            height={230}
            sx={{ borderRadius: '10px' }}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={400}
            height={230}
            sx={{ borderRadius: '10px' }}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={400}
            height={230}
            sx={{ borderRadius: '10px' }}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default FavouriteProjects;
