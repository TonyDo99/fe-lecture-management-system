"use client";
import Course from "@/components/course";
import { ICourses } from "@/types";
import { GeistSans } from "geist/font/sans";
import { Typography } from "antd";
import { GeistMono } from "geist/font/mono";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { useAuthStore } from "@/store/auth";

const { Title } = Typography;

export default function Home() {
  const [courses, setCourses] = useState<ICourses[]>([]);
  const router = useRouter();
  const { user } = useAuthStore();

  const fetchCourses = async () => {
    try {
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_URL_SERVER}/lecture`,
      );
      setCourses(response.data);
    } catch (error) {
      router.push("/signin");
      console.error("Error fetching courses:", error);
    }
  };

  const handleCardInfo = (lectureId: string) => {
    try {
      router.push(`/lecture/${lectureId}`);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <main
      className={`${GeistSans.className} bg-color-primary h-screen w-full px-4 lg:px-40 py-4 border-b gap-8`}
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
            <Link href="/signin">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                Signup
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="mt-20">
        <Title level={2}>Your lectures</Title>
        {courses.map((course: ICourses) => (
          <Course
            key={course._id}
            course={course}
            onNavigate={handleCardInfo}
          />
        ))}
      </div>
    </main>
  );
}
