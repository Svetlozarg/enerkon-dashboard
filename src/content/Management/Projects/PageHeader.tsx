import { Typography, Grid } from '@mui/material';

import AddProjectModal from './modals/AddProjectModal';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Проекти
        </Typography>
        <Typography variant="subtitle2">
          Всички проекти на едно място
        </Typography>
      </Grid>
      <Grid item>
        <AddProjectModal />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
