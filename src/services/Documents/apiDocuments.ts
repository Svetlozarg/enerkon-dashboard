import { USER_EMAIL } from '@/helpers/userHelpers';
import { Query } from '../apiTypes';

export const getAllDocuments = (): Query => ({
  endpoint: `/document/${USER_EMAIL}/documents`,
  method: 'GET'
});

export const createDocument = (projectId: string, body: Object): Query => ({
  endpoint: `/document/create/${USER_EMAIL}/${projectId}`,
  method: 'POST',
  variables: body,
  multipart: true
});

export const getDocumentById = (id: string): Query => ({
  endpoint: `/document/${id}`,
  method: 'GET'
});

export const updateDocument = (body: Object, id: string): Query => ({
  endpoint: `/document/update/${id}`,
  method: 'PUT',
  variables: body
});

export const deleteDocument = (body: {
  id: string;
  fileName: string;
}): Query => ({
  endpoint: `/document/delete`,
  method: 'DELETE',
  variables: body
});

export const downloadDocument = (filename: string): Query => ({
  endpoint: `/document/download/${filename}`,
  method: 'GET',
  blob: true
});

export const previewDocument = (filename: string): Query => ({
  endpoint: `/document/preview/${filename}`,
  method: 'GET'
});

export const generateKCCDocument = (
  projectName: string,
  projectId: string,
  owner: string
): Query => ({
  endpoint: `/document/generate/kcc`,
  method: 'POST',
  variables: {
    projectName,
    projectId,
    owner
  }
});
