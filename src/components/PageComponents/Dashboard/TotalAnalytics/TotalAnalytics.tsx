import {
  Card,
  Box,
  CardContent,
  Typography,
  Avatar,
  useTheme,
  styled
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const RootWrapper = styled(Card)(
  ({ theme }) => `
    background: ${theme.colors.gradients.green1};
    color: ${theme.colors.alpha.white[100]};
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const TypographySecondary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.white[70]};
`
);

interface TotalAnalyticsProps {
  totalProjects: number;
  totalDocuments: number;
}

const TotalAnalytics: React.FC<TotalAnalyticsProps> = ({
  totalProjects,
  totalDocuments
}) => {
  const theme = useTheme();

  return (
    <RootWrapper
      sx={{
        p: 2
      }}
    >
      <Typography
        component="h4"
        variant="h3"
        sx={{
          px: 2,
          pb: 1,
          pt: 2,
          color: `${theme.colors.alpha.white[100]}`
        }}
      >
        Общи Данни
      </Typography>
      <CardContent>
        <Box
          display="flex"
          sx={{
            px: 2,
            pb: 3
          }}
          alignItems="center"
        >
          <AvatarSuccess
            sx={{
              mr: 2
            }}
            variant="rounded"
          >
            <FolderIcon fontSize="large" />
          </AvatarSuccess>
          <Box>
            <Typography component="h4" variant="h1">
              {totalProjects}
            </Typography>
            <TypographySecondary variant="h4" noWrap>
              общо проекти
            </TypographySecondary>
          </Box>
        </Box>
        <Box
          display="flex"
          sx={{
            px: 2,
            pb: 3
          }}
          alignItems="center"
        >
          <AvatarSuccess
            sx={{
              mr: 2
            }}
            variant="rounded"
          >
            <InsertDriveFileIcon fontSize="large" />
          </AvatarSuccess>
          <Box>
            <Typography component="h4" variant="h1">
              {totalDocuments}
            </Typography>
            <TypographySecondary variant="h4" noWrap>
              общо файлове
            </TypographySecondary>
          </Box>
        </Box>
      </CardContent>
    </RootWrapper>
  );
};

export default TotalAnalytics;
