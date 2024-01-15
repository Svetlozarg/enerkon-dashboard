import { Typography, Grid } from '@mui/material';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  modal?: React.ReactElement<any>;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, modal }) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle2">{subtitle}</Typography>
      </Grid>
      <Grid item>{modal}</Grid>
    </Grid>
  );
};

export default PageHeader;
