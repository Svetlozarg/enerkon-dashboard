import { useEffect, useState } from 'react';
import MUITable from '@/components/MuiComponents/MUITable';
import { formatDate } from '@/helpers/helpers';
import { IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import UpdateDocumentModal from './UpdateDocumentModal';
import Dialog from '@/components/MuiComponents/Dialog';
import { openNotification } from '@/store/slices/notifications/notificationSlice';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ProjectTitle from '@/components/SmallComponents/ProjectTitle/ProjecTitle';
import { callApi } from '@/services/callApi';
import {
  deleteDocument,
  downloadDocument,
  previewDocument
} from '@/services/Documents/apiDocuments';
import { Document } from '@/services/Documents/apiDocumentsTypes';

interface DocumentsTableProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  initialProjectDocumentsData: Document[];
  singleProject: boolean;
}

const DocumentsTable: React.FC<DocumentsTableProps> = ({
  loading,
  setLoading,
  initialProjectDocumentsData,
  singleProject
}) => {
  const dispatch = useDispatch();
  const [projectDocumentsData, setProjectDocumentsData] =
    useState<Document[]>();

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
        if (params.value === 'application/xml' || params.value === 'text/xml')
          return 'xml';
        if (
          params.value === 'application/msword' ||
          params.value ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )
          return 'word';
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
        return (
          <>
            {/* Download */}
            <Tooltip title="Изтегли">
              <IconButton
                onClick={async () => {
                  setLoading(true);
                  await callApi<any>({
                    query: downloadDocument(params.row.title)
                  }).then((response) => {
                    const url = window.URL.createObjectURL(
                      new Blob([response])
                    );
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', params.row.title);
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                    setLoading(false);
                  });
                }}
              >
                <DownloadIcon sx={{ color: '#0096FF' }} />
              </IconButton>
            </Tooltip>

            {/* View */}
            <Tooltip title="Прегледай">
              <IconButton
                onClick={async () => {
                  setLoading(true);
                  const previewURL = await callApi<any>({
                    query: previewDocument(params.row.title)
                  });
                  window.open(previewURL.data, '_blank');
                  setLoading(false);
                }}
              >
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
      setLoading(true);

      const body: { id: string; fileName: string } = {
        id: id,
        fileName: fileName
      };

      await callApi<any>({ query: deleteDocument(body) }).then((res) => {
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
          setLoading(false);
        } else if (!res.success) {
          console.log('Problem');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setProjectDocumentsData(initialProjectDocumentsData);
  }, [initialProjectDocumentsData]);

  return (
    <MUITable
      rows={projectDocumentsData}
      columns={documentsColumns}
      loading={loading}
      singleProject={singleProject}
    />
  );
};

export default DocumentsTable;
