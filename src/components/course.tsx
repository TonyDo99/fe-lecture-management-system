"use client";
import Image from "next/image";
import { Button, Card, Flex, Tooltip, Typography } from "antd";
import { PlayCircleTwoTone } from "@ant-design/icons";
import { ICourses } from "@/types";

const { Meta } = Card;

export interface ICourseProps {
  course: ICourses;
  onNavigate: (lectureId: string) => void;
}

const Course: React.FC<ICourseProps> = ({ course, onNavigate }) => (
  <Card
    hoverable
    style={{
      width: 300,
      height: 200,
    }}
    cover={
      <Image
        alt="example"
        width={240}
        height={400}
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
    }
    actions={[
      <Tooltip title="Play" key="Play video">
        <PlayCircleTwoTone
          style={{ fontSize: 23 }}
          onClick={() => onNavigate(course._id)}
        />
      </Tooltip>,
    ]}
  >
    <Meta title={course.title} description={course.description} />
  </Card>
);

export default Course;
