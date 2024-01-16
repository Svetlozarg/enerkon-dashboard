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

export const downloadDocument = async (filename: string) => {
  try {
    const response = await customeAxios.get(
      `${api}/document/download/${filename}`,
      {
        responseType: 'blob'
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
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

export const generateKCCDocument = async (
  projectName: string,
  projectId: string,
  owner: string
) => {
  try {
    const response = await customeAxios.post(`${api}/document/generate/kcc`, {
      projectName: projectName,
      projectId: projectId,
      owner: owner
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
