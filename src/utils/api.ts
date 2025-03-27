import axios, { AxiosResponse } from "axios";
import { useAuthStore } from "@/store/auth";
import { ILecture, IUser } from "@/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_SERVER,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const apiUpload = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_SERVER,
  headers: { "Content-Type": "multipart/form-data" },
});

apiUpload.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const apiGetUsers = (): Promise<AxiosResponse<IUser[]>> =>
  api.get(`${process.env.NEXT_PUBLIC_URL_SERVER}/user/list`);

const apiDeleteUser = (_id: string): Promise<AxiosResponse<IUser[]>> =>
  api.delete(`${process.env.NEXT_PUBLIC_URL_SERVER}/user/${_id}`);

const apiDeleteLecture = (_id: string): Promise<void> =>
  api.delete(`${process.env.NEXT_PUBLIC_URL_SERVER}/lecture/${_id}`);

const apiRegisterUser = (values: IUser): Promise<void> =>
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
  apiDeleteLecture,
  apiRegisterUser,
  apiCreateLecture,
  apiGetLecture,
  apiUpdateLecture,
};
