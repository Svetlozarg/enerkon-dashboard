import { USER_EMAIL } from '@/helpers/userHelpers';
import { Query } from '../apiTypes';

export const getAllProjects = (): Query => ({
  endpoint: `/project/${USER_EMAIL}/projects`,
  method: 'GET'
});

export const createProject = (body: {
  title: string;
  owner: string;
}): Query => ({
  endpoint: '/project/create',
  method: 'POST',
  variables: body
});

export const getProjectById = (id: string): Query => ({
  endpoint: `/project/${id}`,
  method: 'GET'
});

export const getProjectDocuments = (id: string): Query => ({
  endpoint: `/project/${id}/documents`,
  method: 'GET'
});

export const updateProject = (
  body: { title?: string; status?: string },
  id: string
): Query => ({
  endpoint: `/project/update/${id}`,
  method: 'PUT',
  variables: body
});

export const deleteProject = (body: { id: string }): Query => ({
  endpoint: `/project/delete`,
  method: 'DELETE',
  variables: body
});

export const getProjectLog = (id: string): Query => ({
  endpoint: `/project/log/${id}`,
  method: 'GET'
});

export const getProjectsAnalytics = (): Query => ({
  endpoint: `/project/${USER_EMAIL}/analytics`,
  method: 'GET'
});
