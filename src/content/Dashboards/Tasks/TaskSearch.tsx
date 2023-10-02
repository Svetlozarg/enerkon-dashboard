import { useRef, useState, useEffect } from 'react';
import {
  Button,
  Card,
  Grid,
  Box,
  FormControl,
  CardActions,
  Typography,
  Divider,
  OutlinedInput,
  Pagination,
  InputAdornment,
  Menu,
  MenuItem,
  styled,
  useTheme
} from '@mui/material';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import Link from 'src/components/Link';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Text from 'src/components/Text';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
    padding-right: ${theme.spacing(0.7)}
`
);

function TaskSearch() {
  const theme = useTheme();
  const { projects } = useSelector((state: RootState) => state.project);
  const { documents } = useSelector((state: RootState) => state.document);

  const periods = [
    {
      value: 'recent',
      text: 'Най-нови'
    },
    {
      value: 'oldest',
      text: 'Най-стари'
    }
  ];

  const actionRef1 = useRef<any>(null);
  const [openPeriod, setOpenMenuPeriod] = useState<boolean>(false);
  const [period, setPeriod] = useState<string>(periods[0].text);

  const getProjectDocumentsTotalCount = (projectId: string) => {
    let documentsCount: number = 0;
    for (const document of documents) {
      if (document.project === projectId) {
        documentsCount++;
      }
    }
    return documentsCount;
  };

  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsPerPage = 3; 

  const [filteredProjects, setFilteredProjects] = useState(projects);

  
  useEffect(() => {
    const filtered = projects.filter((project: any) =>
      project.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProjects(filtered);
    setCurrentPage(1); 
  }, [searchText, projects]);

  const [sortedProjects, setSortedProjects] = useState([...filteredProjects]);

  useEffect(() => {
    const sorted = [...filteredProjects].sort((a, b) => {
      const dateA = new Date(a.createdAt) as any;
      const dateB = new Date(b.createdAt) as any;
      return dateA - dateB;
    });
    setSortedProjects(sorted);
    setCurrentPage(1);
  }, [filteredProjects]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  return (
    <>
      <FormControl variant="outlined" fullWidth>
        <OutlinedInputWrapper
          type="text"
          placeholder="Търси по заглавие на проект..."
          endAdornment={
            <InputAdornment position="end">
              <Button variant="contained" size="small">
                Търси
              </Button>
            </InputAdornment>
          }
          startAdornment={
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          }
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </FormControl>
      <Box
        py={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle2">
            Налични{' '}
            <Text color="black">
              <b>{projects.length}</b>
            </Text>
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
        <Typography variant="subtitle2" sx={{ pr: 1 }}>
          Филтър:
        </Typography>
        <Button
          size="small"
          variant="outlined"
          ref={actionRef1}
          onClick={() => setOpenMenuPeriod(true)}
          endIcon={<ExpandMoreTwoToneIcon fontSize="small" />}
        >
          {period}
        </Button>
        <Menu
          disableScrollLock
          anchorEl={actionRef1.current}
          onClose={() => setOpenMenuPeriod(false)}
          open={openPeriod}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem
            key="oldest"
            onClick={() => {
              setPeriod('Най-стари');
              setOpenMenuPeriod(false);
              setCurrentPage(1);
              setFilteredProjects(sortedProjects); // Sorted in ascending order
            }}
          >
            Най-стари
          </MenuItem>
          <MenuItem
            key="newest"
            onClick={() => {
              setPeriod('Най-нови');
              setOpenMenuPeriod(false);
              setCurrentPage(1);
              setFilteredProjects([...sortedProjects].reverse()); // Reversed for "Най-нови"
            }}
          >
            Най-нови
          </MenuItem>
        </Menu>
      </Box>
      </Box>

      {/* Projects */}
      <Grid container spacing={3}>
        {currentProjects.map((project: any) => {
          const dateString = project.createdAt;
          const dateObject = new Date(dateString);
          const year = dateObject.getFullYear();
          const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
          const day = dateObject.getDate().toString().padStart(2, '0');
          const formattedDate = `${day}.${month}.${year}`;

          return (
            <Grid item xs={12} md={4} key={project.id}>
              <Card
                variant="outlined"
                sx={{
                  p: 3,
                  background: `${theme.colors.alpha.black[5]}`
                }}
              >
                <Link href="#" variant="h3" color="text.primary">
                  {project.title}
                </Link>

                {/* Rest of your card content */}
                <Typography
                  sx={{
                    pb: 2
                  }}
                  color="text.secondary"
                >
                  {project.description}
                </Typography>
                <Button size="small" variant="contained">
                  Прегледай проект
                </Button>
                <Divider
                  sx={{
                    my: 2
                  }}
                />
                <CardActions
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography
                    display="flex"
                    alignItems="center"
                    variant="subtitle2"
                  >
                    <TodayTwoToneIcon
                      sx={{
                        mr: 1
                      }}
                    />
                    <p>{formattedDate}</p>
                  </Typography>
                  <Typography
                    display="flex"
                    alignItems="center"
                    variant="subtitle2"
                  >
                    {getProjectDocumentsTotalCount(project._id)} файла
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Pagination */}
      <Box
        sx={{
          pt: 4
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Pagination
          showFirstButton
          showLastButton
          count={Math.ceil(filteredProjects.length / projectsPerPage)} 
          page={currentPage}
          onChange={handlePageChange}
          siblingCount={0}
          size="large"
          shape="rounded"
          color="primary"
        />
      </Box>
    </>
  );
}

export default TaskSearch;
