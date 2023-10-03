import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getProjectLog } from '@/services/project';

interface Props {
  projectId: string;
}

const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Заглавие',
    width: 300,
    sortable: false,
    renderCell: (params) => {
      return params.row.log[0].title;
    }
  },
  {
    field: 'action',
    headerName: 'Действие',
    width: 300,
    sortable: false,
    renderCell: (params) => {
      return params.row.log[0].action;
    }
  },
  {
    field: 'date',
    headerName: 'Дата',
    width: 200,
    sortable: false,
    renderCell: (params) => {
      const rawDate = params.row.log[0].date;
      const formattedDate = new Date(rawDate).toLocaleString(); // Format the date
      return formattedDate;
    }
  }
];

export default function ProjectLogTable(props: Props) {
  const { projectId } = props;
  const [logData, setLogData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (projectId) {
          const data = await getProjectLog(projectId);

          const sortedData = data.data.sort(
            (a: any, b: any) =>
              (new Date(b.log[0].date) as any) -
              (new Date(a.log[0].date) as any)
          );

          setLogData(sortedData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [projectId]);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={logData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 }
          }
        }}
        pageSizeOptions={[10, 15, 20]}
        checkboxSelection={false}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnSelector
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
