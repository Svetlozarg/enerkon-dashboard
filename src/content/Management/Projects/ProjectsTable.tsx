import * as React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Project } from '@/store/slices/project/projectSlice';
import { IconButton } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import LinearProgress from '@mui/material/LinearProgress';

import UpdateProjectModal from './modals/UpdateProjectModal';
import DeleteProjectModal from './modals/DeleteProjectModal';
import { DataGridLocale } from '@/helpers/DataGridLocale';

interface Props {
  projects: Project[];
  loading: boolean;
}

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ИД', width: 100 },
  { field: 'title', headerName: 'Заглавие', width: 400 },
  {
    field: 'updatedAt',
    headerName: 'Дата на промяна',
    width: 220,
    valueGetter: (params) => {
      if (!params.value) {
        return params.value;
      }

      const dateString = params.value;
      const dateObject = new Date(dateString);
      const year = dateObject.getFullYear();
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
      const day = dateObject.getDate().toString().padStart(2, '0');
      const formattedDate = `${day}.${month}.${year}`;
      return formattedDate;
    }
  },
  {
    field: 'createdAt',
    headerName: 'Дата на създаване',
    width: 220,
    valueGetter: (params) => {
      if (!params.value) {
        return params.value;
      }

      const dateString = params.value;
      const dateObject = new Date(dateString);
      const year = dateObject.getFullYear();
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
      const day = dateObject.getDate().toString().padStart(2, '0');
      const formattedDate = `${day}.${month}.${year}`;
      return formattedDate;
    }
  },
  {
    field: 'actions',
    headerName: 'Действия',
    width: 200,
    renderCell: (params) => {
      return (
        <>
          <IconButton>
            <VisibilityIcon sx={{ color: '#0096FF' }} />
          </IconButton>
          <UpdateProjectModal id={params.row._id} title={params.row.title} />
          <DeleteProjectModal id={params.row._id} title={params.row.title} />
        </>
      );
    }
  }
];

export default function ProjectsTable(props: Props) {
  const { projects, loading } = props;
  return (
    <div style={{ height: 500, width: '100%' }}>
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
