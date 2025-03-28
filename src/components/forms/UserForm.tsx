"use client";
import { Form, Input, Select, Button, message } from "antd";
import { useState } from "react";
import { apiRegisterUser } from "@/utils/api";
import { IUser } from "@/types";

const UserForm = ({
  type,
  data,
  open,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: IUser) => {
    setLoading(true);
    try {
      await apiRegisterUser(values);
      message.success("Create a user account successfully!");
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
          Create a user
        </h1>
        <div className="text-xs md:text-sm text-gray-400 font-medium mb-6">
          Personal Information
        </div>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required!", max: 50 }]}
          initialValue={data?.name}
          className="mb-4"
        >
          <Input className="w-full" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required!", type: "email" },
          ]}
          initialValue={data?.email}
          className="mb-4"
        >
          <Input className="w-full" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password is required!" }]}
          initialValue={data?.password}
          className="mb-6"
        >
          <Input.Password className="w-full" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Role is required!" }]}
          initialValue={data?.role}
          className="mb-6"
        >
          <Select>
            <Select.Option value="user">User</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
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

export default UserForm;
