export type Version = {
  self: string;
  id: string;
  name: string;
  archived: boolean;
  released: boolean;
  startDate: string;
  releaseDate: string;
  overdue: boolean;
  userStartDate: string;
  userReleaseDate: string;
  projectId: number;

  description?: string;
  releaseDateSet?: boolean;
  startDateSet?: boolean;
};
