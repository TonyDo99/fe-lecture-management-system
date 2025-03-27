"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function LecturePage() {
  const params = useParams();

  return (
    <div className="h-screen grid place-items-center">
      <ReactPlayer
        muted={false}
        playing={true}
        controls
        volume={1}
        url={`${process.env.NEXT_PUBLIC_S3_LECTURE_URL}/${params.id}.mp4`}
      />
    </div>
  );
}
