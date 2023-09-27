import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';

// Import your getProjects function
import { getProjects } from '@/services/project';

const LinearProgressWrapper = styled(LinearProgress)(({ theme }) => `
  flex-grow: 1;
  height: 10px;
  margin: ${theme.spacing(1, 0, 2)};
  
  &.MuiLinearProgress-root {
    background-color: ${theme.colors.alpha.black[10]};
  }
  
  .MuiLinearProgress-bar {
    border-radius: ${theme.general.borderRadiusXl};
  }
`);

function Projects() {
  const theme = useTheme();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const projectData = await getProjects();
      if (projectData && projectData.success) {
        setProjects(projectData.data);
      }
    }

    fetchProjects();
  }, []);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3,
        }}
      >
        <Typography variant="h3">Проекти</Typography>
        <Box>
          <Button size="small" variant="outlined">
            Виж всички проекти
          </Button>
        </Box>
      </Box>
      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid item xs={12} md={4} key={project._id}>
            <Box>
              <CardHeader
                sx={{
                  px: 0,
                  pt: 0,
                }}
                title={project.title}
                titleTypographyProps={{
                  variant: 'h5',
                  color: 'textPrimary',
                }}
              />
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Файлове:{' '}
                  
                    <b>{project.documents.length}</b>
                  
                  <b> /100</b>
                </Typography>
                <LinearProgressWrapper
                  value={project.documents.length}
                  color="primary"
                  variant="determinate"
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                
                <Box>
                  <Tooltip
                    arrow
                    title="Mark project as favourite"
                    placement="top"
                  >
                    <IconButton
                      size="small"
                      sx={{
                        color: `${theme.colors.warning.main}`,
                        ml: 0.5,
                      }}
                    >
                      <StarTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Projects;
