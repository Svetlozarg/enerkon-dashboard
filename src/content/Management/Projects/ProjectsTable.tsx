import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Project } from '@/store/slices/project/projectSlice';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LinearProgress from '@mui/material/LinearProgress';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  projects: Project[];
  loading: boolean;
}

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', width: 100 },
  { field: 'title', headerName: 'Title', width: 400 },
  {
    field: 'updatedAt',
    width: 200,
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
    width: 200,
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
    headerName: 'Actions',
    width: 200,
    renderCell: () => {
      return (
        <>
          <IconButton>
            <VisibilityIcon sx={{ color: '#0096FF' }} />
          </IconButton>
          <IconButton>
            <EditIcon sx={{ color: '#FFBF00' }} />
          </IconButton>
          <IconButton>
            <DeleteIcon sx={{ color: '#dc143c' }} />
          </IconButton>
        </>
      );
    }
  }
];

export default function DataTable(props: Props) {
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
          loadingOverlay: LinearProgress
        }}
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
      />
    </div>
  );
}
