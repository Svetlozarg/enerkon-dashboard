import { Typography, Grid } from '@mui/material';
import AddDocumentModal from './modals/AddDocumentModal';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Документи
        </Typography>
        <Typography variant="subtitle2">
          Всички документи на едно място
        </Typography>
      </Grid>
      <Grid item>
        <AddDocumentModal />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
