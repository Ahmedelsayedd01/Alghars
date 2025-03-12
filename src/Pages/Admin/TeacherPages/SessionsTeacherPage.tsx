import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Teachers, TeacherSession } from "../../../types";
import { SubmitButton } from "../../../Components/Components";
import * as XLSX from "xlsx";

interface SessionsTeacherPageProps {
  nameTitle: (name: string | undefined) => void;
}
const SessionsTeacherPage = ({ nameTitle }: SessionsTeacherPageProps) => {
  const { teacherId } = useParams();
  const teachersStore = useSelector((state: any) => state.teachers.data);

  const [sessions, setSessions] = useState<TeacherSession[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const SessionsPerPage = 10; // Limit to 10 Teachers per page

  useEffect(() => {
    const teacher = teachersStore.find(
      (teacher: Teachers) => teacher.id === parseInt(teacherId!)
    );
    setSessions(teacher?.sessions || []);
    nameTitle(teacher?.name);
  }, [teacherId]);

  const handleShare = () => {
    const data = sessions.map((session: TeacherSession, index: number) => ({
      "#": index + 1,
      "اسم الطالب": `${session?.student.name || "-"}`,
      "عنوان الطالب": `${session?.student.address || "-"}`,
      "هاتف ولي الأمر": `${session?.student.parent_phone || "-"}`,
      " التاريخ ": `${session?.date || "-"}`,
      "ميعاد البدء": `${session?.start || "لم تبداء"}`,
      "ميعاد الانتهاء": `${session?.end || "لم تنتهي"}`,
      " الحالة ":
        (session.status === "pending" && "قيد الانتظار") ||
        (session.status === "processing" && "قيد التنفيذ") ||
        (session.status === "done" && "تمت") ||
        (session.status === "cancelled" && "لم يتم تنفيذها"),
    }));
    // Create a new workbook and add the data
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Define custom column widths
    worksheet["!cols"] = [
      { wch: 5 }, // Column for "#"
      { wch: 30 }, // Column for "Name"
      { wch: 30 }, // Column for "address"
      { wch: 20 }, // Column for "parent phone"
      { wch: 20 }, // Column for "date"
      { wch: 20 }, // Column for "start"
      { wch: 20 }, // Column for "end"
      { wch: 20 }, // Column for "Status"
    ];

    // Append the customized worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sessions");

    // Export the file
    XLSX.writeFile(workbook, "sessions.xlsx");
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(sessions.length / SessionsPerPage);

  // Get the Sessions for the current page
  const currentSessions = sessions.slice(
    (currentPage - 1) * SessionsPerPage,
    currentPage * SessionsPerPage
  );

  // handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const headers = [
    "#",
    "اسم الطالب",
    "عنوان الطالب",
    "هاتف ولي الأمر",
    "التاريخ",
    "ميعاد البدء",
    "ميعاد الانتهاء",
    "الحالة",
  ];
  return (
    <div className="w-full flex items-start justify-start">
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex items-center justify-end">
          <SubmitButton
            type="button"
            text={"مشاركة"}
            handleClick={handleShare}
            withIcon={false}
            withShare={true}
            px="px-0"
            width="w-48"
            bgColor={"secondColor"}
            rounded="rounded-xl"
          />
        </div>
        <div className="overflow-auto rounded-lg shadow-lg">
          <table className="w-full border-collapse min-w-max">
            <thead className="bg-mainColor text-white">
              <tr>
                {headers.map((name, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-center text-xl sm:text-base md:text-lg lg:text-xl whitespace-nowrap"
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sessions.length === 0 ? (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="py-4 text-center text-xl text-gray-600 font-TextFontMedium"
                  >
                    لا يوجد حصص
                  </td>
                </tr>
              ) : (
                currentSessions.map((session, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-center text-mainColor text-xl sm:text-base">
                      {(currentPage - 1) * SessionsPerPage + index + 1}
                    </td>
                    {/* Student Name */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {session?.student?.name || "-"}
                    </td>
                    {/* Student Address */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {session?.student?.address || "-"}
                    </td>
                    {/* Student Parent Phone */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {session?.student?.parent_phone || "-"}
                    </td>
                    {/* Session Date */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {session?.date || "-"}
                    </td>
                    {/* Session Start Time */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {session?.start || "لم تبداء"}
                    </td>
                    {/* Session End Time */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {session?.end || "لم تنتهي"}
                    </td>
                    {/* Session Status */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {session?.status === "pending" && "قيد الانتظار"}
                      {session?.status === "processing" && "قيد التنفيذ"}
                      {session?.status === "done" && "تمت"}
                      {session?.status === "cancelled" && "لم يتم تنفيذها"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {sessions.length > 10 && (
          <div className="flex flex-wrap items-center justify-center gap-x-4">
            {totalPages !== currentPage && (
              <SubmitButton
                text="التالي"
                bgColor="mainColor"
                px="px-0"
                rounded="rounded-xl"
                handleClick={() => setCurrentPage(currentPage + 1)}
                width="w-24"
                type="button"
                withIcon={false}
                withShare={false}
              />
            )}
            <div className="flex flex-row-reverse items-center justify-center gap-x-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 text-lg cursor-pointer font-TextFontSemiBold rounded-full duration-300 ${
                      currentPage === page
                        ? "bg-mainColor text-white"
                        : " text-mainColor"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            {currentPage !== 1 && (
              <SubmitButton
                text="السابق"
                bgColor="mainColor"
                px="px-0"
                rounded="rounded-xl"
                handleClick={() => setCurrentPage(currentPage - 1)}
                width="w-24"
                type="button"
                withIcon={false}
                withShare={false}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default SessionsTeacherPage;
