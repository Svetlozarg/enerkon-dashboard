import { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
  styled
} from '@mui/material';
import { formatDate } from '@/helpers/helpers';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { openNotification } from '@/store/slices/notifications/notificationSlice';
import { Project } from '@/services/Projects/apiProjectsTypes';
import { callApi } from '@/services/callApi';
import {
  getProjectDocuments,
  updateProject
} from '@/services/Projects/apiProjects';
import { GetProjectDocumentsDataSnippet } from '@/services/Projects/apiProjectsSnippets';

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

interface FavouriteProjectCardProps {
  project: Project;
  setFavouriteProjectsData: React.Dispatch<React.SetStateAction<Project[]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const FavouriteProjectCard: React.FC<FavouriteProjectCardProps> = ({
  project,
  setFavouriteProjectsData,
  currentPage,
  setCurrentPage
}) => {
  const dispatch = useDispatch();
  const [totalProjectDocuments, setTotalProjectDocuments] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const totalProjectDocuments =
          await callApi<GetProjectDocumentsDataSnippet>({
            query: getProjectDocuments(project._id)
          });

        if (totalProjectDocuments.success) {
          setTotalProjectDocuments(totalProjectDocuments.data.length);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleRemoveFromFavourites = async () => {
    try {
      await callApi<any>({
        query: updateProject({ favourite: false }, project._id)
      }).then((res) => {
        if (res.success) {
          setCurrentPage(currentPage - 1);
          setFavouriteProjectsData((prevProjects) =>
            prevProjects.filter(
              (prevProject) => prevProject._id !== project._id
            )
          );
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      sx={{
        border: '2px solid #2C3152',
        borderRadius: '10px',
        p: 2
      }}
      gap={2}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={0.5}
        >
          <ContentPasteIcon />
          <Typography component="h4" fontSize="1.3rem" fontWeight="bold">
            {project.title}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-end"
          gap={0.5}
        >
          <CalendarMonthIcon />
          <Typography component="p" variant="h4" fontWeight="normal">
            {formatDate(project.createdAt).split(' ')[0]}
          </Typography>
        </Stack>
      </Stack>

      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
            gap={0.5}
          >
            <FolderOpenOutlinedIcon />
            <Typography component="p" variant="h4" fontWeight="normal">
              Файлове:
            </Typography>
          </Stack>

          <Typography component="p" variant="h4" fontWeight="normal">
            {totalProjectDocuments} /100
          </Typography>
        </Stack>
      </Box>

      <LinearProgressWrapper
        value={totalProjectDocuments}
        color="primary"
        variant="determinate"
      />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          component="p"
          variant="h4"
          color={project.status === 'paid' ? 'green' : 'error'}
        >
          {project.status === 'paid' ? 'Платен' : 'Неплатен'}
        </Typography>

        <Box>
          <Link href={`/project/${project._id}`}>
            <IconButton>
              <VisibilityIcon sx={{ fontSize: '2rem', color: '#0096FF' }} />
            </IconButton>
          </Link>

          <IconButton onClick={handleRemoveFromFavourites}>
            <StarIcon sx={{ fontSize: '2rem', color: '#FFA319' }} />
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  );
};

export default FavouriteProjectCard;
