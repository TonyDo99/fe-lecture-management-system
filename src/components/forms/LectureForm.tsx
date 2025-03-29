"use client";
import { Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { apiCreateLecture, apiUpdateLecture } from "@/utils/api";
import { useState } from "react";

const LectureForm = ({
  type,
  data,
  open,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  open?: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const updateLecture = async (formData: FormData) => {
    setLoading(true);
    try {
      await apiUpdateLecture(data._id, formData);
      message.success("Update a lecture successfully!");
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createLecture = async (formData: FormData) => {
    setLoading(true);
    try {
      await apiCreateLecture(formData);
      message.success("Create a lecture successfully!");
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("author", values.author);
    formData.append("video", values.video.file);
    if (type === "create") {
      await createLecture(formData);
    }
    if (type === "update") {
      await updateLecture(formData);
    }
  };

  return (
    open && (
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="max-w-[600px] w-full mx-auto px-4 sm:px-6 lg:p-8"
      >
        <h1 className="text-xl md:text-2xl font-semibold mb-2">
          Create a lecture
        </h1>
        <div className="text-xs md:text-sm text-gray-400 font-medium mb-6">
          Personal Information
        </div>

        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Title is required!",
            },
            {
              min: 5,
              max: 200,
              message: "Title must be between 5 and 200 characters",
            },
          ]}
          initialValue={data?.title}
          className="mb-4"
        >
          <Input className="w-full" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Description is required!",
            },
            {
              min: 10,
              max: 500,
              message: "Title must be between 10 and 500 characters",
            },
          ]}
          initialValue={data?.description}
          className="mb-4"
        >
          <Input className="w-full" />
        </Form.Item>

        <Form.Item
          label="Author"
          name="author"
          rules={[
            {
              required: true,
              message: "Author is required!",
            },
          ]}
          initialValue={data?.author}
          className="mb-4"
        >
          <Input className="w-full" />
        </Form.Item>

        <Form.Item
          label="Lecture"
          name="video"
          rules={[{ required: true, message: "The video is required!" }]}
          className="mb-6"
        >
          <Upload
            // accept="video/*" // Restrict to video files
            showUploadList={false}
            beforeUpload={(file: File) => {
              form.setFieldValue("video", file);
              message.success("Upload successful!");
              return false; // Prevent default upload behavior
            }}
          >
            <Button icon={<UploadOutlined />}>Upload Video</Button>
          </Upload>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          loading={loading}
        >
          {type === "create" ? "Create" : "Update"}
        </Button>
      </Form>
    )
  );
};

export default LectureForm;
