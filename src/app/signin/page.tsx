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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useAuthStore } from "../../store/auth";

const { Title, Text, Link } = Typography;

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

const initalFieldValue: FieldType = {
  email: "",
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
  const { setAuth, user } = useAuthStore();

  const onFinish = (values: FieldType) => {
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_URL_SERVER}/user/login`, {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        if (response.status === 200) {
          message.open({
            type: "success",
            content: "Login successful",
          });

          setAuth(response.data.token);
          setLoading(false);
        }
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (user?.role === "admin") {
      router.push("/list/lessons");
    } else if (user?.role === "user") {
      router.push("/");
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
          {/* <Logo color="white" /> */}
          <Text
            className="text-white"
            style={{
              fontSize: 35,
            }}
          >
            Welcome back to KR Academy
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
          <Title className="m-0">Login</Title>
          <Flex gap={4}>
            <Text>Dont have an account?</Text>
            <Link href="/">Create an account here</Link>
          </Flex>
          <Form
            form={form}
            name="sign-up-form"
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={initalFieldValue}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Row gutter={[8, 0]}>
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
              <Col xs={24}>
                <Form.Item<FieldType> name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
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
                  Sign in
                </Button>
                <Link href="/">Forgot password?</Link>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Col>
    </Row>
  );
}
