import { Box, LinearProgress, Stack, Typography } from '@mui/material';

interface MUILinearProgressProps {
  value: number;
}

const LoadingProgress: React.FC<MUILinearProgressProps> = ({ value }) => {
  return (
    <Stack
      sx={{ width: '100%' }}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography component="p" variant="body1">
          {value}%
        </Typography>
      </Box>
    </Stack>
  );
};

export default LoadingProgress;
