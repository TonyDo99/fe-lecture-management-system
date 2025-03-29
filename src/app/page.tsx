"use client";
import Lecture from "@/components/Lecture";
import { GeistSans } from "geist/font/sans";
import { Avatar, Modal, Space, Typography } from "antd";
import { GeistMono } from "geist/font/mono";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiGetLecture } from "@/utils/api";
import { ILecture } from "@/types";
import UserForm from "@/components/forms/UserForm";
import { useAuthStore } from "@/store/auth";

const { Title } = Typography;

export default function Home() {
  const [lectures, setLectures] = useState<ILecture[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuthStore();
  const router = useRouter();

  const handleCardInfo = (lectureId: string) => {
    try {
      router.push(`/lecture/${lectureId}`);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const { data } = await apiGetLecture();
        setLectures(data);
      } catch (error) {
        router.push("/signin");
        console.error("Error fetching courses:", error);
      }
    };

    fetchLectures();
  }, [router]);

  return (
    <main
      className={`${GeistSans.className} h-screen w-full px-4 lg:px-40 py-4 border-b gap-8`}
    >
      <nav>
        <div className="flex w-full px-4 lg:px-40 py-4 items-center border-b text-center gap-8 justify-between">
          <div className="flex gap-2 h-full">
            <a href="/">
              <h2
                className={`${GeistMono.className} font-bold text-lg text-color-secondary`}
              >
                KR Academy
              </h2>
            </a>
          </div>
          <div className="flex gap-4 lg:ml-auto">
            <Space size={16} wrap>
              <div
                className="cursor-pointer"
                onClick={() => setOpenModal(true)}
              >
                <Avatar
                  src="https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="avatar"
                  size={40}
                />
              </div>

              <Link href="/signin">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                  Signup
                </button>
              </Link>
            </Space>
          </div>
        </div>
      </nav>

      <div className="mt-20">
        <Title level={2}>Your lectures</Title>
        {lectures.map((lecture: ILecture) => (
          <Lecture
            key={lecture._id}
            lecture={lecture}
            onNavigate={handleCardInfo}
          />
        ))}
      </div>
      <Modal
        centered
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={false}
      >
        <UserForm
          type="update"
          data={user}
          open={openModal}
          setOpen={setOpenModal}
        />
      </Modal>
    </main>
  );
}
