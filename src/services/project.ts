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

// Create Create Project
export const createProject = async (body: Object) => {
  try {
    const response = await customeAxios.post(`${api}/project/create`, body);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Get Projects By Id
export const getProjectId = async (id: string) => {
  try {
    const response = await customeAxios.get(`${api}/project/${id}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Update Project
export const updateProject = async (body: Object, id: string) => {
  try {
    const response = await customeAxios.put(`${api}/project/update/${id}`, body);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Delete Project
export const deleteProject = async (body: Object) => {
  try {
    const response = await customeAxios.delete(`${api}/project/delete`, body);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};