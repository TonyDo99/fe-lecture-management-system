import axios, { AxiosResponse } from "axios";
import { ILecture, IUser } from "@/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_SERVER,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Add this to enable sending cookies
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

const apiUpload = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_SERVER,
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: true, // Add this to enable sending cookies
});

apiUpload.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

const apiGetUsers = (): Promise<AxiosResponse<IUser[]>> =>
  api.get(`${process.env.NEXT_PUBLIC_URL_SERVER}/user/list`);

const apiLoginUser = (
  values: Pick<IUser, "email" | "password">,
): Promise<AxiosResponse<{ user: IUser }>> =>
  api.post(`${process.env.NEXT_PUBLIC_URL_SERVER}/user/login`, values);

const apiDeleteUser = (_id: string): Promise<AxiosResponse<IUser[]>> =>
  api.delete(`${process.env.NEXT_PUBLIC_URL_SERVER}/user/${_id}`);

const apiUpdateUser = (
  _id: string,
  values: Pick<IUser, "name" | "password">,
): Promise<AxiosResponse<IUser>> =>
  api.patch(`${process.env.NEXT_PUBLIC_URL_SERVER}/user/${_id}`, values);

const apiDeleteLecture = (_id: string): Promise<void> =>
  api.delete(`${process.env.NEXT_PUBLIC_URL_SERVER}/lecture/${_id}`);

const apiRegisterUser = (
  values: Pick<IUser, "email" | "name" | "password">,
): Promise<AxiosResponse<IUser>> =>
  api.post(`${process.env.NEXT_PUBLIC_URL_SERVER}/user/register`, values);

const apiCreateLecture = (formData: FormData): Promise<void> =>
  apiUpload.post(
    `${process.env.NEXT_PUBLIC_URL_SERVER}/lecture/create`,
    formData,
  );

const apiGetLecture = (): Promise<AxiosResponse<ILecture[]>> =>
  api.get(`${process.env.NEXT_PUBLIC_URL_SERVER}/lecture`);

const apiUpdateLecture = (
  _id: string,
  formData: FormData,
): Promise<AxiosResponse<ILecture[]>> =>
  apiUpload.patch(
    `${process.env.NEXT_PUBLIC_URL_SERVER}/lecture/${_id}`,
    formData,
  );

export {
  api,
  apiUpload,
  apiGetUsers,
  apiDeleteUser,
  apiLoginUser,
  apiUpdateUser,
  apiRegisterUser,
  apiDeleteLecture,
  apiCreateLecture,
  apiGetLecture,
  apiUpdateLecture,
};
