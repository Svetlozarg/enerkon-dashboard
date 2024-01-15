import { customeAxios } from '@/plugins/axios';
const api = process.env.NEXT_PUBLIC_API_LINK;
import { userEmail } from '@/helpers/GetUser';

export const getDocuments = async () => {
  try {
    const response = await customeAxios.get(
      `${api}/document/${userEmail}/documents`
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createDocument = async (projectId: string, body: Object) => {
  try {
    const response = await customeAxios.post(
      `${api}/document/create/${userEmail}/${projectId}`,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateDocument = async (body: Object, id: string) => {
  try {
    const response = await customeAxios.put(
      `${api}/document/update/${id}`,
      body
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteDocument = async (body: Object) => {
  try {
    const response = await customeAxios.delete(`${api}/document/delete`, {
      data: body
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDocumentId = async (id: string) => {
  try {
    const response = await customeAxios.get(`${api}/document/${id}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getFile = async (filename: string) => {
  try {
    const response = await customeAxios.get(`${api}/document/file/${filename}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const generateKCCTemplate = async (body: Object) => {
  try {
    const response = await customeAxios.post(
      `${api}/document/template/kcc`,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const generateReportTemplate = async (body: Object) => {
  try {
    const response = await customeAxios.post(
      `${api}/document/template/report`,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const downloadDocument = async (filename: string) => {
  try {
    const response = await customeAxios.get(
      `${api}/document/download/${filename}`,
      {
        responseType: 'blob',
        headers: {
          Accept: 'application/octet-stream'
        }
      }
    );

    const blob = response.data;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  }
};

export const previewDocument = async (filename: string) => {
  try {
    const response = await customeAxios.get(
      `${api}/document/preview/${filename}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
