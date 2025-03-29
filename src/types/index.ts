export interface AbstractProperties {
  createdAt: Date;
  updatedAt: Date;
}

export interface ILecture extends AbstractProperties {
  _id: string;
  title: string;
  author: string;
  description: string;
  destication: string;
}

export interface IUser extends AbstractProperties {
  _id: string;
  password: string;
  email: string;
  name: string;
  role: "user" | "admin";
}
