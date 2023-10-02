import { useState } from 'react';
import {
  Button,
  CardHeader,
  Box,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  LinearProgress,
  styled,
  useTheme,
  CircularProgress,
  Pagination
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';
import { updateProject } from '@/services/project';
import { fetchProjects } from '@/store/slices/project/projectSlice';
import { openNotification } from '@/store/slices/notifications/notificationSlice';

const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
  flex-grow: 1;
  height: 10px;
  margin: ${theme.spacing(1, 0, 2)};
  
  &.MuiLinearProgress-root {
    background-color: ${theme.colors.alpha.black[10]};
  }
  
  .MuiLinearProgress-bar {
    border-radius: ${theme.general.borderRadiusXl};
  }
`
);

function Projects() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { projects, loading } = useSelector(
    (state: RootState) => state.project
  );
  const { documents } = useSelector((state: RootState) => state.document);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsPerPage = 6;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const filteredProject = projects.filter((obj: any) => obj.favourite === true);
  const currentProjects = filteredProject.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const getProjectDocumentsTotalCount = (projectId: string) => {
    let documentsCount: number = 0;
    for (const document of documents) {
      if (document.project === projectId) {
        documentsCount++;
      }
    }
    return documentsCount;
  };

  const handleRemoveProjectFromFavourite = (id: string) => {
    const body: Object = {
      favourite: false
    };

    updateProject(body, id).then((res) => {
      if (res.success) {
        dispatch(fetchProjects() as any);
        dispatch(
          openNotification({
            isOpen: true,
            text: 'Проекта е успешно премахнат от любими',
            severity: 'success'
          })
        );
      } else if (!res.success) {
        console.log('Problem');
      }
    });
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3
        }}
      >
        <Typography variant="h3">Проекти</Typography>
        <Box>
          <Link href="/dashboard/projects">
            <Button size="small" variant="outlined">
              Виж всички проекти
            </Button>
          </Link>
        </Box>
      </Box>
      <Grid container spacing={4}>
        {currentProjects.map((project: any) => {
          const dateString = project.createdAt;
          const dateObject = new Date(dateString);
          const year = dateObject.getFullYear();
          const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
          const day = dateObject.getDate().toString().padStart(2, '0');
          const formattedDate = `${day}.${month}.${year}`;

          if (project.favourite) {
            return (
              <Grid item xs={12} md={4} key={project._id} >
                <Box sx={{
                  border: '2px solid #2C3152',
                  borderRadius: '15px',
                  padding: '15px'
                }}>
                  <CardHeader
                    sx={{
                      px: 0,
                      pt: 0
                    }}
                    title={project.title}
                    titleTypographyProps={{
                      variant: 'h5',
                      color: 'textPrimary'
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Файлове:{' '}
                      <b>{getProjectDocumentsTotalCount(project._id)}</b>
                      <b> /100</b>
                    </Typography>
                    <LinearProgressWrapper
                      value={getProjectDocumentsTotalCount(project._id)}
                      color="primary"
                      variant="determinate"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box>
                      <Typography>{formattedDate}</Typography>
                    </Box>
                    <Box>
                      <Tooltip arrow title="Прегледай проекта" placement="top">
                        <Link href={`/dashboard/project/${project._id}`}>
                          <IconButton
                            size="medium"
                            sx={{
                              color: '#0096FF',
                              ml: 0.5
                            }}
                          >
                            <VisibilityIcon fontSize="medium" sx={{
                            fontSize: '2rem'
                          }}/>
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip arrow title="Премахни от любими" placement="top">
                        <IconButton
                          size="medium"
                          sx={{
                            color: `${theme.colors.warning.main}`,
                            ml: 0.5,
                          }}
                          onClick={() =>
                            handleRemoveProjectFromFavourite(project._id)
                          }
                        >
                          <StarIcon fontSize="medium" sx={{
                            fontSize: '2rem'
                          }}/>
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          }
        })}

        {/* Pagination */}
        {!loading && filteredProject.length >= 6 && (
          <Box
            sx={{
              width: '100%',
              pt: 4
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Pagination
              showFirstButton
              showLastButton
              count={Math.ceil(filteredProject.length / projectsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              siblingCount={0}
              size="large"
              shape="rounded"
              color="primary"
            />
          </Box>
        )}

        {loading && (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Grid>
    </>
  );
}

export default Projects;
