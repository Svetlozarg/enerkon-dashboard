import * as React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteDocumentModal from './modals/DeleteDocumentModal';
import UpdateDocumentModal from './modals/UpdateDocumentModal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Document } from '@/store/slices/document/documentSlice';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGridLocale } from '@/helpers/DataGridLocale';
import CustomTitleColumn from './CustomeTitleColumn';

interface Props {
  documents: Document[];
  loading: boolean;
}

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ИД', width: 20 },
  { field: 'title', headerName: 'Заглавие', width: 150 },
  { field: 'document', headerName: 'Документ', width: 150 },
  { field: 'type', headerName: 'Тип', width: 10 },
  {
    field: 'project',
    headerName: 'Проект',
    width: 150,
    renderCell: (params) => <CustomTitleColumn id={params.value} />
  },
  {
    field: 'updatedAt',
    headerName: 'Дата на промяна',
    width: 150,
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
    width: 150,
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
    field: 'status',
    headerName: 'Статус',
    width: 100,
    renderCell: (params) => {
      if (params.value === 'In process')
        return <p style={{ color: 'yellow' }}>В процес</p>;
      if (params.value === 'Canceled')
        return <p style={{ color: 'yellow' }}>В процес</p>;
      if (params.value === 'Finished')
        return <p style={{ color: 'yellow' }}>В процес</p>;
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
          <UpdateDocumentModal id={params.row._id} title={params.row.title} />
          <DeleteDocumentModal id={params.row._id} title={params.row.title} />
        </>
      );
    }
  }
];

export default function DocumentsTable(props: Props) {
  const { documents, loading } = props;
  console.log(documents);

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={documents}
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
