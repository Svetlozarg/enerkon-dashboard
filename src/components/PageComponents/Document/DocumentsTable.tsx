import { useState } from 'react';
import MUITable from '@/components/MuiComponents/MUITable';
import { formatDate } from '@/helpers/helpers';
import {
  deleteDocument,
  downloadDocument,
  previewDocument
} from '@/services/document';
import { IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import UpdateDocumentModal from './UpdateDocumentModal';
import Dialog from '@/components/MuiComponents/Dialog';
import { openNotification } from '@/store/slices/notifications/notificationSlice';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Document } from '@/services/apiTypes';
import ProjectTitle from '@/components/SmallComponents/ProjectTitle/ProjecTitle';

interface DocumentsTableProps {
  initialProjectDocumentsData: Document[];
  singleProject: boolean;
}

const DocumentsTable: React.FC<DocumentsTableProps> = ({
  initialProjectDocumentsData,
  singleProject
}) => {
  const dispatch = useDispatch();
  const [projectDocumentsData, setProjectDocumentsData] = useState<Document[]>(
    initialProjectDocumentsData
  );

  const documentsColumns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Заглавие',
      width: singleProject ? 300 : 250
    },
    {
      field: 'project',
      headerName: 'Проект',
      width: 150,
      renderCell: (params) => <ProjectTitle projectId={params.value} />
    },
    {
      field: 'type',
      headerName: 'Тип',
      width: 10,
      renderCell: (params) => {
        if (params.value === 'application/xml') return 'xml';
        if (params.value === 'application/msword') return 'word';
        if (
          params.value ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
          return 'excel';
      }
    },
    {
      field: 'updatedAt',
      headerName: 'Дата на промяна',
      width: 150,
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
      width: 150,
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
          const previewURL = await previewDocument(params.row.title);
          window.open(previewURL.data, '_blank');
        };

        return (
          <>
            {/* Download */}
            <Tooltip title="Изтегли">
              <IconButton
                onClick={async () => await downloadDocument(params.row.title)}
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

            {/* Update */}
            {!params.row.default && (
              <Tooltip title="Редактирай">
                <UpdateDocumentModal
                  documentId={params.row._id}
                  currentDocumentTitle={params.row.title}
                  currentDocumentStatus={params.row.status}
                  setProjectDocumentsData={setProjectDocumentsData}
                />
              </Tooltip>
            )}

            {/* Delete */}
            {!params.row.default && (
              <Tooltip title="Изтрий">
                <Dialog
                  icon={<DeleteIcon color="error" />}
                  buttonText="Изтрий"
                  dialogTitle={`Изтриване на документ ${params.row.title}`}
                  dialogDescription="Сигурни ли сте, че искате да изтриете този документ?"
                  onConfirm={() =>
                    handleDeleteDocument(params.row._id, params.row.title)
                  }
                />
              </Tooltip>
            )}
          </>
        );
      }
    }
  ];

  const handleDeleteDocument = async (id: string, fileName: string) => {
    try {
      const body: Object = {
        id: id,
        fileName: fileName
      };

      deleteDocument(body).then((res) => {
        if (res.success) {
          setProjectDocumentsData((prevDcoumentsData) => {
            const updatedData = prevDcoumentsData.filter(
              (document) => document._id !== id
            );
            return updatedData;
          });
          dispatch(
            openNotification({
              isOpen: true,
              text: 'Документа е успешно изтрит',
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

  return (
    <>
      {projectDocumentsData && (
        <MUITable
          rows={projectDocumentsData}
          columns={documentsColumns}
          loading={!projectDocumentsData ? true : false}
          singleProject={singleProject}
        />
      )}
    </>
  );
};

export default DocumentsTable;
