export type Project = {
  _id: string;
  title: string;
  owner: string;
  favourite: boolean;
  status: 'unpaid' | 'paid';
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type ProjectAnalytics = {
  paid: number[];
  unpaid: number[];
};
