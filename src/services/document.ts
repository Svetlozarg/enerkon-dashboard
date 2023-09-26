import { customeAxios } from '@/plugins/axios';
const api = process.env.NEXT_PUBLIC_API_LINK;

export const getDocuments = async () => {
  try {
    const response = await customeAxios.get(`${api}/document/documents`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const createDocument = async (body: Object) => {
    try {
      const response = await customeAxios.post(`${api}/document/create`, body, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
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