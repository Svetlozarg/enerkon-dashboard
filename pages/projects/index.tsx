import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/SmallComponents/PageTitleWrapper';
import {
  Grid,
  Container,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import Footer from '@/layouts/Footer';
import { useEffect, useState } from 'react';
import { deleteProject, getProjects, updateProject } from '@/services/project';
import { Project } from '@/services/apiTypes';
import MUITable from '@/components/MuiComponents/MUITable';
import { GridColDef } from '@mui/x-data-grid';
import { formatDate } from '@/helpers/helpers';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import PageHeader from '@/components/SmallComponents/PageHeader/PageHeader';
import Modal from '@/components/MuiComponents/Modal';
import AddProjectModalContent from '@/components/PageComponents/Project/AddProjectModalContent';
import { openNotification } from '@/store/slices/notifications/notificationSlice';
import { useDispatch } from 'react-redux';
import Dialog from '@/components/MuiComponents/Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateProjectModal from '@/components/PageComponents/Project/UpdateProjectModal';
import Link from 'next/link';
import RefreshIcon from '@mui/icons-material/Refresh';
import ConstructionIcon from '@mui/icons-material/Construction';

function ProjectsPage() {
  const dispatch = useDispatch();
  const [projectsData, setProjectsData] = useState<Project[]>();
  const [openProjectModal, setOpenProjectModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Заглаие',
      width: 250,
      editable: true
    },
    {
      field: 'updatedAt',
      headerName: 'Да на промяна',
      width: 180,
      editable: true,
      valueGetter: (params) => {
        if (!params.value) {
          return params.value;
        }
        return formatDate(params.value);
      }
    },
    {
      field: 'createdAt',
      headerName: 'Дата на създаване',
      type: 'number',
      width: 180,
      editable: true,
      valueGetter: (params) => {
        if (!params.value) {
          return params.value;
        }
        return formatDate(params.value);
      }
    },
    {
      field: 'status',
      headerName: 'Статус',
      sortable: false,
      width: 160,
      renderCell: (params) => {
        if (params.value === 'unpaid')
          return <Typography sx={{ color: 'red' }}>Неплатен</Typography>;
        if (params.value === 'paid')
          return <Typography sx={{ color: 'green' }}>Платен</Typography>;
      }
    },
    {
      field: 'actions',
      headerName: 'Действия',
      width: 300,
      renderCell: (params) => {
        return (
          <>
            {/* View */}
            <Tooltip title="Прегледай">
              <Link href={`/project/${params.row._id}`}>
                <IconButton>
                  <VisibilityIcon sx={{ color: '#0096FF' }} />
                </IconButton>
              </Link>
            </Tooltip>

            {/* Favourite */}
            <Tooltip
              title={
                params.row.favourite ? 'Премахни от любими' : 'Добави в любими'
              }
            >
              <IconButton
                onClick={() =>
                  handleUpdateProjectFavourite(
                    params.row._id,
                    params.row.favourite
                  )
                }
              >
                {params.row.favourite ? (
                  <StarIcon sx={{ color: '#FFD700' }} />
                ) : (
                  <StarBorderIcon sx={{ color: '#FFD700' }} />
                )}
              </IconButton>
            </Tooltip>

            {/* Update */}
            <Tooltip title="Редактирай">
              <UpdateProjectModal
                projectId={params.row._id}
                currentProjectTitle={params.row.title}
                currentProjectStatus={params.row.status}
                setProjectsData={setProjectsData}
              />
            </Tooltip>

            {/* TODO */}
            <Tooltip title="Пресъздай проектови файлове">
              <IconButton disabled>
                <RefreshIcon sx={{ color: '#228B22' }} />
              </IconButton>
            </Tooltip>

            {/* TODO */}
            <Tooltip title="Пресъздай проект">
              <IconButton disabled>
                <ConstructionIcon sx={{ color: '#F4430E' }} />
              </IconButton>
            </Tooltip>

            {/* Delete */}
            <Tooltip title="Изтрий">
              <Dialog
                icon={<DeleteIcon color="error" />}
                buttonText="Изтрий"
                dialogTitle={`Изтриване на проект ${params.row.title}`}
                dialogDescription="Сигурни ли сте, че искате да изтриете този проект?"
                onConfirm={() => handleDeleteProject(params.row._id)}
              />
            </Tooltip>
          </>
        );
      }
    }
  ];

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const projectsData = await getProjects();

        if (projectsData.success) {
          setProjectsData(projectsData.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleUpdateProjectFavourite = async (
    id: string,
    favourite: boolean
  ) => {
    try {
      const body: Object = {
        favourite: !favourite
      };

      updateProject(body, id).then((res) => {
        if (res.success) {
          setProjectsData((prevProjectsData) => {
            const updatedData = prevProjectsData.map((project) => {
              if (project._id === id) {
                return {
                  ...project,
                  favourite: !favourite
                };
              }
              return project;
            });
            return updatedData;
          });

          dispatch(
            openNotification({
              isOpen: true,
              text: favourite
                ? 'Проекта е успешно премахнат от любими'
                : 'Проекта е успешно добавен в любими',
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

  const handleDeleteProject = async (id: string) => {
    try {
      setLoading(true);
      const body: Object = {
        id: id
      };

      deleteProject(body)
        .then((res) => {
          if (res.success) {
            setProjectsData((prevProjectsData) => {
              const updatedData = prevProjectsData.filter(
                (project) => project._id !== id
              );
              return updatedData;
            });
            dispatch(
              openNotification({
                isOpen: true,
                text: 'Проекта е успешно изтрит',
                severity: 'success'
              })
            );
            setLoading(false);
          } else if (!res.success) {
            console.log('Problem');
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Проекти</title>
        <meta charSet="UTF-8" />
      </Head>
      <PageTitleWrapper>
        <PageHeader
          title="Проекти"
          subtitle="Всички проекти на едно място"
          modal={
            <Modal
              modalTitle="Създай проект"
              open={openProjectModal}
              setOpen={setOpenProjectModal}
            >
              <AddProjectModalContent
                setProjectsData={setProjectsData}
                openProjectModal={openProjectModal}
                setOpenProjectModal={setOpenProjectModal}
              />
            </Modal>
          }
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid item xs={12}>
          <MUITable rows={projectsData} columns={columns} loading={loading} />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ProjectsPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default ProjectsPage;
