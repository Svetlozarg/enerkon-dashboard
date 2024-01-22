export type Document = {
  _id: string;
  title: string;
  owner: string;
  project: string;
  size: number;
  type: string;
  status: 'In process' | 'Finished' | 'Cancelled';
  default: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
