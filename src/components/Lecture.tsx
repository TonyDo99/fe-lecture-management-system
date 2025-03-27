"use client";
import Image from "next/image";
import { Button, Card, Flex, Tooltip, Typography } from "antd";
import { PlayCircleTwoTone } from "@ant-design/icons";
import { ILecture } from "@/types";

const { Meta } = Card;

export interface ILectureProps {
  lecture: ILecture;
  onNavigate: (lectureId: string) => void;
}

const Lecture: React.FC<ILectureProps> = ({ lecture, onNavigate }) => (
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
          onClick={() => onNavigate(lecture._id)}
        />
      </Tooltip>,
    ]}
  >
    <Meta title={lecture.title} description={lecture.description} />
  </Card>
);

export default Lecture;
