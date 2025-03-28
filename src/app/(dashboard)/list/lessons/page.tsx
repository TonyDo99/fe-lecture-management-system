"use client";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { useAuthStore } from "@/store/auth";
import { ILecture } from "@/types";
import { apiGetLecture } from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Description",
    accessor: "description",
  },
  {
    header: "Author",
    accessor: "author",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const LessonListPage = () => {
  const [lectures, setLectures] = useState<ILecture[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = lectures.slice(indexOfFirstItem, indexOfLastItem);

  const fetchLectures = async () => {
    try {
      const { data } = await apiGetLecture();
      setLectures(data);
    } catch (error: unknown) {
      console.error("Error fetching lectures:", error);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  const renderRow = (item: ILecture) => (
    <tr
      key={item._id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 py-4">{item.title}</td>
      <td>{item.description}</td>
      <td className="hidden md:table-cell">{item.author}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal
                table="lecture"
                type="update"
                id={item._id}
                data={item}
              />
              <FormModal table="lecture" type="delete" id={item._id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All lectures</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="lecture" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={currentItems} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default LessonListPage;
