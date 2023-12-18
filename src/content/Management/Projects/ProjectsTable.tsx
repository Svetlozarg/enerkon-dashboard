import * as React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Project, fetchProjects } from '@/store/slices/project/projectSlice';
import { IconButton, Tooltip } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import LinearProgress from '@mui/material/LinearProgress';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import UpdateProjectModal from './modals/UpdateProjectModal';
import DeleteProjectModal from './modals/DeleteProjectModal';
import { DataGridLocale } from '@/helpers/DataGridLocale';
import { updateProject } from '@/services/project';
import { store } from '@/store/store';
import { openNotification } from '@/store/slices/notifications/notificationSlice';
import Link from 'next/link';
import RecreatePorjectDocumentsModal from './modals/RecreatePorjectDocumentsModal';
import RecreatePorjectModal from './modals/RecreateProjectModal';

interface Props {
  projects: Project[];
  loading: boolean;
}

const handleProjectFavourite = (id: string, favourite: boolean) => {
  if (favourite) {
    const body: Object = {
      favourite: false
    };

    updateProject(body, id).then((res) => {
      if (res.success) {
        store.dispatch(fetchProjects() as any);
        store.dispatch(
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
  } else if (!favourite) {
    const body: Object = {
      favourite: true
    };

    updateProject(body, id).then((res) => {
      if (res.success) {
        store.dispatch(fetchProjects() as any);
        store.dispatch(
          openNotification({
            isOpen: true,
            text: 'Проекта е успешно добавен в любими ',
            severity: 'success'
          })
        );
      } else if (!res.success) {
        console.log('Problem');
      }
    });
  }
};

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Заглавие', width: 250 },
  {
    field: 'updatedAt',
    headerName: 'Дата на промяна',
    width: 180,
    valueGetter: (params) => {
      if (!params.value) {
        return params.value;
      }

      const dateString = params.value;
      const dateObject = new Date(dateString);
      const year = dateObject.getFullYear();
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
      const day = dateObject.getDate().toString().padStart(2, '0');
      const hours = dateObject.getHours().toString().padStart(2, '0');
      const minutes = dateObject.getMinutes().toString().padStart(2, '0');
      const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
      return formattedDate;
    }
  },
  {
    field: 'createdAt',
    headerName: 'Дата на създаване',
    width: 180,
    valueGetter: (params) => {
      if (!params.value) {
        return params.value;
      }

      const dateString = params.value;
      const dateObject = new Date(dateString);
      const year = dateObject.getFullYear();
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
      const day = dateObject.getDate().toString().padStart(2, '0');
      const hours = dateObject.getHours().toString().padStart(2, '0');
      const minutes = dateObject.getMinutes().toString().padStart(2, '0');
      const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
      return formattedDate;
    }
  },
  {
    field: 'status',
    headerName: 'Статус',
    width: 150,
    renderCell: (params) => {
      if (params.value === 'Unpaid')
        return <p style={{ color: 'red' }}>Неплатен</p>;
      if (params.value === 'Paid')
        return <p style={{ color: 'green' }}>Платен</p>;
    }
  },
  {
    field: 'actions',
    headerName: 'Действия',
    width: 300,
    renderCell: (params) => {
      return (
        <>
          <Link href={`/dashboard/project/${params.row._id}`}>
            <Tooltip title="Прегледай">
              <IconButton>
                <VisibilityIcon sx={{ color: '#0096FF' }} />
              </IconButton>
            </Tooltip>
          </Link>

          {params.row.favourite ? (
            <Tooltip title="Премахни от любими">
              <IconButton
                onClick={() =>
                  handleProjectFavourite(params.row._id, params.row.favourite)
                }
              >
                <StarIcon sx={{ color: '#FFD700' }} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Добави в любими">
              <IconButton
                onClick={() =>
                  handleProjectFavourite(params.row._id, params.row.favourite)
                }
              >
                <StarBorderIcon sx={{ color: '#FFD700' }} />
              </IconButton>
            </Tooltip>
          )}

          <UpdateProjectModal
            id={params.row._id}
            title={params.row.title}
            currentStatus={params.row.status}
          />

          <RecreatePorjectDocumentsModal
            id={params.row._id}
            title={params.row.title}
          />

          <RecreatePorjectModal
            projectTitle={params.row.title}
            projectID={params.row._id}
          />

          <DeleteProjectModal id={params.row._id} title={params.row.title} />
        </>
      );
    }
  }
];

export default function ProjectsTable(props: Props) {
  const { projects, loading } = props;
  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={projects}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 }
          }
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
        loading={loading}
        disableRowSelectionOnClick
        slots={{
          loadingOverlay: LinearProgress,
          toolbar: GridToolbar
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            printOptions: { disableToolbarButton: true },
            csvOptions: { disableToolbarButton: true }
          }
        }}
        localeText={DataGridLocale}
        sx={{
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'divider'
          },
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none !important'
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus': {
            outline: 'none !important'
          }
        }}
        disableDensitySelector
      />
    </div>
  );
}
