import React from 'react';
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
  useTheme
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';

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
  const { projects } = useSelector((state: RootState) => state.project);
  const { documents } = useSelector((state: RootState) => state.document);

  const getProjectDocumentsTotalCount = (projectId: string) => {
    let documentsCount: number = 0;
    for (const document of documents) {
      if (document.project === projectId) {
        documentsCount++;
      }
    }
    return documentsCount;
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
        {projects.map((project: any) => {
          const dateString = project.createdAt;
          const dateObject = new Date(dateString);
          const year = dateObject.getFullYear();
          const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
          const day = dateObject.getDate().toString().padStart(2, '0');
          const formattedDate = `${day}.${month}.${year}`;

          if (project.favourite) {
            return (
              <Grid item xs={12} md={4} key={project._id}>
                <Box>
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
                        <IconButton
                          size="small"
                          sx={{
                            color: '#0096FF',
                            ml: 0.5
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow title="Премахни от любими" placement="top">
                        <IconButton
                          size="small"
                          sx={{
                            color: `${theme.colors.warning.main}`,
                            ml: 0.5
                          }}
                        >
                          <StarIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          }
        })}
      </Grid>
    </>
  );
}

export default Projects;
