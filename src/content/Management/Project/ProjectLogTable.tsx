import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getProjectLog } from '@/services/project';
import { Project } from '@/store/slices/project/projectSlice';

interface Props {
  documents: Document[];
  loading: boolean;
}

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Заглавие', width: 300, sortable: false, renderCell: (params) => {
    return params.row.log[0].title
  } },
  { field: 'action', headerName: 'Действие', width: 300, sortable: false, renderCell: (params) => {
    return params.row.log[0].action
  } },
  {
    field: 'date',
    headerName: 'Date',
    width: 200,
    sortable: false,
    renderCell: (params) => {
      const rawDate = params.row.log[0].date;
      const formattedDate = new Date(rawDate).toLocaleString(); // Format the date
      return formattedDate;
    },
  },
];

export default function ProjectLogTable() {
  const [logData, setLogData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjectLog('651ac8f272f6613748432991'); 
        setLogData(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={logData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnSelector
        sx={{
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'divider',
          },
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none !important',
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus': {
            outline: 'none !important',
          },
        }}
      />
    </div>
  );
}
