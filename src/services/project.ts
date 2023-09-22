import { customeAxios } from '@/plugins/axios';
const api = process.env.NEXT_PUBLIC_API_LINK;

// Get All Projects
export const getProjects = async () => {
  try {
    const response = await customeAxios.get(`${api}/project/projects`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
