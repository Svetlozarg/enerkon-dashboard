import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { DataGridLocale } from '@/helpers/DataGridLocale';
import LinearProgress from '@mui/material/LinearProgress';
import { Document, Project } from '@/services/apiTypes';

interface MUITableProps {
  rows: Project[] | Document[];
  columns: GridColDef[];
  loading: boolean;
  singleProject?: boolean;
}

const MUITable: React.FC<MUITableProps> = ({
  rows,
  columns,
  loading,
  singleProject
}) => {
  return (
    <Box sx={{ height: 600, width: '100%', bgcolor: '#101632' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 }
          }
        }}
        pageSizeOptions={[10, 20]}
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
          p: 1,
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
        columnVisibilityModel={{
          project: !singleProject
        }}
      />
    </Box>
  );
};

export default MUITable;
