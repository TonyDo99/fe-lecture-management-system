export interface AbstractProperties {
  createdAt: Date;
  updatedAt: Date;
}

export interface ICourses extends AbstractProperties {
  _id: string;
  title: string;
  author: string;
  description: string;
  destication: string;
}
