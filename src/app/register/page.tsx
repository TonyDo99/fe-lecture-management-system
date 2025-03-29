"use client";
import {
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  message,
  Row,
  theme,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useAuthStore } from "../../store/auth";
import { apiLoginUser, apiRegisteUser } from "@/utils/api";

const { Title, Text, Link } = Typography;

type FieldType = {
  email: string;
  name: string;
  password: string;
  remember: boolean;
};

const initalFieldValue: FieldType = {
  email: "",
  name: "",
  password: "",
  remember: false,
};

export default function SignInPage() {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { setUser, user } = useAuthStore();

  const onFinish = async (values: FieldType) => {
    try {
      setLoading(true);
      const { data } = await apiRegisteUser(values);

      if (data) {
        message.success("Register successfully!");
        setUser(data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      message.error(
        "Register unsuccessfully!. Account might be already registered",
      );
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/signin");
    }
  }, [router, user]);

  return (
    <Row style={{ minHeight: isMobile ? "auto" : "100vh", overflow: "hidden" }}>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          gap={20}
          align="center"
          justify="center"
          className="text-center"
          style={{ background: colorPrimary, height: "100%", padding: "1rem" }}
        >
          <Text
            className="text-white"
            style={{
              fontSize: 35,
            }}
          >
            Welcome to KR Academy
          </Text>
          <Text className="text-white" style={{ fontSize: 20 }}>
            All the skills you need in one place From critical skills to
            technical topics, KR Academy supports your professional development.
          </Text>
        </Flex>
      </Col>
      <Col className="bg-white" xs={24} lg={12}>
        <Flex
          vertical
          align={isMobile ? "center" : "flex-start"}
          justify="center"
          gap="middle"
          style={{ height: "100%", padding: "2rem" }}
        >
          <Title className="m-0">Register</Title>
          <Form
            form={form}
            name="sign-up-form"
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={initalFieldValue}
            onFinish={onFinish}
            autoComplete="off"
            requiredMark={false}
          >
            <Row gutter={[8, 0]}>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name" },
                    {
                      max: 50,
                      message: "Name should not exceed 50 characters",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Flex align="center" justify="space-between">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="middle"
                  loading={loading}
                >
                  Register
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Col>
    </Row>
  );
}
