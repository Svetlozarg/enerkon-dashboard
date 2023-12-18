import * as React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import DeleteDocumentModal from '../Documents/modals/DeleteDocumentModal';
import UpdateDocumentModal from '../Documents/modals/UpdateDocumentModal';
import { Document } from '@/store/slices/document/documentSlice';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGridLocale } from '@/helpers/DataGridLocale';
import CustomTitleColumn from '../Documents/CustomeTitleColumn';
import DownloadIcon from '@mui/icons-material/Download';
import { downloadDocument, previewDocument } from '@/services/document';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Props {
  documents: Document[];
  loading: boolean;
}

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ИД', width: 20 },
  { field: 'title', headerName: 'Заглавие', width: 150 },
  {
    field: 'type',
    headerName: 'Тип',
    width: 10,
    renderCell: (params) => {
      if (params.value === 'text/xml') return 'xml';
      if (params.value === 'application/msword') return 'word';
      if (
        params.value ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
        return 'excel';
    }
  },
  {
    field: 'document',
    headerName: 'Документ',
    width: 150,
    renderCell: (params) => {
      // Extract the required information from the 'document' object
      const { id, size } = params.value;
      const sizeInMb = (size / (1024 * 1024)).toFixed(2); // Convert size to MB with two decimal places

      // Create a custom tooltip with the extracted information
      const tooltipContent = (
        <div>
          <p>ID: {id}</p>
          <p>Size: {sizeInMb} MB</p>
        </div>
      );

      return (
        <Tooltip title={<div>{tooltipContent}</div>} arrow>
          <span style={{ cursor: 'pointer' }}>Виж повече</span>
        </Tooltip>
      );
    }
  },
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
        return <p style={{ color: 'red' }}>Отказан</p>;
      if (params.value === 'Finished')
        return <p style={{ color: 'green' }}>Завършен</p>;
    }
  },
  {
    field: 'actions',
    headerName: 'Действия',
    width: 200,
    renderCell: (params) => {
      const handlePreviewURL = async () => {
        const previewURL = await previewDocument(params.row.document.fileName);
        window.open(previewURL.data, '_blank');
      };

      return (
        <>
          {/* Download */}
          <Tooltip title="Изтегли">
            <IconButton
              onClick={async () =>
                await downloadDocument(params.row.document.fileName)
              }
            >
              <DownloadIcon sx={{ color: '#0096FF' }} />
            </IconButton>
          </Tooltip>
          {/* View */}
          <Tooltip title="Прегледай">
            <IconButton onClick={handlePreviewURL}>
              <VisibilityIcon sx={{ color: '#4682B4' }} />
            </IconButton>
          </Tooltip>
          {!params.row.default && (
            <UpdateDocumentModal
              id={params.row._id}
              title={params.row.title}
              currentStatus={params.row.status}
              projectId={params.row.project}
            />
          )}
          {!params.row.default && (
            <DeleteDocumentModal
              id={params.row._id}
              fileName={params.row.document.fileName}
              title={params.row.title}
              projectId={params.row.project}
            />
          )}
        </>
      );
    }
  }
];

export default function ProjectDocumentTable(props: Props) {
  const { documents, loading } = props;

  return (
    <div style={{ height: 600, width: '100%' }}>
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
