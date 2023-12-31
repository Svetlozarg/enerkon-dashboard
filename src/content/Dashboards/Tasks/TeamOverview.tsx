import {
  Box,
  Grid,
  Typography,
  Avatar,
  LinearProgress,
  styled
} from '@mui/material';
import Text from 'src/components/Text';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        height: 10px;
        
        &.MuiLinearProgress-root {
          background-color: ${theme.colors.alpha.black[10]};
        }
        
        .MuiLinearProgress-bar {
          border-radius: ${theme.general.borderRadiusXl};
        }
`
);

function TeamOverview() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Box>
          <Box display="flex" alignItems="center" pb={3}>
            <AvatarWrapper alt="Enerkon" src="с" />
            <Box
              sx={{
                ml: 1.5
              }}
            >
              <Typography variant="h4" noWrap gutterBottom>
                Име проект
              </Typography>
              <Typography variant="subtitle2" noWrap>
                Подзаглавие
              </Typography>
            </Box>
          </Box>

          <Typography variant="subtitle2" gutterBottom>
            <Text color="black">4</Text> ot <Text color="black">6</Text> файла
            приключени
          </Typography>
          <LinearProgressWrapper
            value={65}
            color="primary"
            variant="determinate"
          />
        </Box>
      </Grid>

      <Grid item xs={12} md={4}>
        <Box>
          <Box display="flex" alignItems="center" pb={3}>
            <AvatarWrapper alt="Enerkon" src="с" />
            <Box
              sx={{
                ml: 1.5
              }}
            >
              <Typography variant="h4" noWrap gutterBottom>
                Име проект
              </Typography>
              <Typography variant="subtitle2" noWrap>
                Подзаглавие
              </Typography>
            </Box>
          </Box>

          <Typography variant="subtitle2" gutterBottom>
            <Text color="black">54</Text> ot <Text color="black">90</Text> файла
            приключени
          </Typography>
          <LinearProgressWrapper
            value={45}
            color="primary"
            variant="determinate"
          />
        </Box>
      </Grid>

      <Grid item xs={12} md={4}>
        <Box>
          <Box display="flex" alignItems="center" pb={3}>
            <AvatarWrapper alt="Enerkon" src="с" />
            <Box
              sx={{
                ml: 1.5
              }}
            >
              <Typography variant="h4" noWrap gutterBottom>
                Име проект
              </Typography>
              <Typography variant="subtitle2" noWrap>
                Подзаглавие
              </Typography>
            </Box>
          </Box>

          <Typography variant="subtitle2" gutterBottom>
            <Text color="black">22</Text> ot <Text color="black">60</Text> файла
            приключени
          </Typography>
          <LinearProgressWrapper
            value={35}
            color="primary"
            variant="determinate"
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default TeamOverview;
