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