import { Document } from '../Documents/apiDocumentsTypes';
import { Project, ProjectAnalytics } from './apiProjectsTypes';

export type GetAllProjectsSnippet = {
  success: boolean;
  data: Project[];
};

export type GetProjectSnippet = {
  success: boolean;
  data: Project;
};

export type GetProjectsAnalyticsSnippet = {
  success: boolean;
  data: ProjectAnalytics;
};

export type GetProjectDocumentsDataSnippet = {
  success: boolean;
  data: Document[];
};

export type GetProjectLogSnippet = {
  success: boolean;
  data: ProjectAnalytics;
};
