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
      "هاتف ولي الأمر": `${session?.student.parentPhone || "-"}`,
      'التاريخ': `${session?.date || "-"}`,
      "ميعاد البدء": `${session?.start || "-"}`,
      "ميعاد الانتهاء": `${session?.end || "-"}`,
      'الحالة':
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
        <table className="w-full sm:min-w-0 block ">
          <thead className="w-full">
            <tr className="w-full border-b-2 border-mainColor">
              {headers.map((name, index) => (
                <th
                  className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3"
                  key={index}
                >
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full">
            {sessions.length === 0 ? (
              <tr>
                <td
                  colSpan={12}
                  className="pt-2 text-center text-xl text-mainColor font-TextFontMedium  "
                >
                  لا يوجد حصص
                </td>
              </tr>
            ) : (
              currentSessions.map((session, index: number) => (
                <tr
                  className="w-full border-b-2 border-gray-300"
                  key={session.id}
                >
                  <td className="min-w-[50px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {(currentPage - 1) * SessionsPerPage + index + 1}
                  </td>
                  {/* Student Name */}
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {session?.student?.name || "-"}
                  </td>
                  {/* Student Address */}
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {session?.student?.address || "-"}
                  </td>
                  {/* Student Parent Phone */}
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {session?.student?.parentPhone || "-"}
                  </td>
                  {/* Session Date */}
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {session?.date || "-"}
                  </td>
                  {/* Session Start Time */}
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {session?.start || "-"}
                  </td>
                  {/* Session End Time */}
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {session?.end || "-"}
                  </td>
                  {/* Session Status */}
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
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
