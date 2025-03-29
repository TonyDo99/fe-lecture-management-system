"use client";

import { apiDeleteLecture, apiDeleteUser } from "@/utils/api";
import { message } from "antd";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

const LectureForm = dynamic(() => import("./forms/LectureForm"), {
  loading: () => <h1>Loading...</h1>,
});
const UserForm = dynamic(() => import("./forms/UserForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (
    type: "create" | "update",
    data: any,
    open: boolean,
    setOpen: (open: boolean) => void,
  ) => JSX.Element;
} = {
  lecture: (type, data, open, setOpen) => (
    <LectureForm type={type} data={data} open={open} setOpen={setOpen} />
  ),
  user: (type, data, open, setOpen) => (
    <UserForm type={type} data={data} open={open} setOpen={setOpen} />
  ),
};

const FormModal = ({
  table,
  type,
  data,
  id = "",
}: {
  table: "user" | "lecture";
  type: "create" | "update" | "delete";
  data?: any;
  id?: string;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
        ? "bg-lamaSky"
        : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    const handleDelete = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        switch (table) {
          case "lecture":
            await apiDeleteLecture(id);
            break;
          case "user":
            await apiDeleteUser(id);
            break;
          default:
            break;
        }
        setOpen(false);
        message.success(`Delete ${table} successfully !`);
      } catch (error) {
        message.error(`Delete ${table} failed !`);
        console.error(error);
      }
    };

    return type === "delete" && id ? (
      <form action="" className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md border-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-red-700 text-white py-2 px-4 rounded-md border-none"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table] ? (
        forms[table](type, data, open, setOpen)
      ) : (
        <div>Form for {table} not yet implemented</div>
      )
    ) : (
      <div className="p-4 text-center text-red-500">Form not found!</div>
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
