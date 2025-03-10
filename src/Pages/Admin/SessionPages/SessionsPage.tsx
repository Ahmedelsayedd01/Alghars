import { useEffect, useState } from "react";
import { useChangeState } from "../../../Hooks/useChangeState";
import { useDelete } from "../../../Hooks/useDelete";
import { useGet } from "../../../Hooks/useGet";
import {
  SearchBar,
  StaticLoader,
  SubmitButton,
  Switch,
} from "../../../Components/Components";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useSelector } from "react-redux";
import { SessionsSec } from "../../../types";
import { DeleteIcon, EditIcon, WarningIcon } from "../../../assets/Assets";
import * as XLSX from "xlsx";

const SessionsPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const sessionsStore = useSelector((state: any) => state.sessions.data);
  const {
    refetch: refetchSessions,
    loading: loadingSessions,
    data: dataSessions,
  } = useGet(`${apiUrl}/admin/session/show`);

  const { changeState, loadingChange /* responseChange */ } = useChangeState();
  const { deleteData, loadingDelete /* responseDelete */ } = useDelete();

  const [sessions, setSessions] = useState<SessionsSec[]>([]);
  const [filterSessions, setFilterSessions] = useState<SessionsSec[]>([]);
  const [filterText, setFilterText] = useState<string>("");

  const [openDelete, setOpenDelete] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const SessionsPerPage = 10; // Limit to 10 Sessions per page
  // Calculate total number of pages
  const totalPages = Math.ceil(filterSessions.length / SessionsPerPage);

  // Get the Sessions for the current page
  const currentSessions = filterSessions.slice(
    (currentPage - 1) * SessionsPerPage,
    currentPage * SessionsPerPage
  );

  // handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  /* 
   "اسم المعلم
"هاتف المعلم
"اسم الحصة
"الاشتراك",
"التاريخ",
"ميعاد البدء
"ميعاد الانتهاء
"الحالة",
"النشاط",
"ادوات",
     */
  const handleShare = () => {
    const data = filterSessions.map((session: SessionsSec, index: number) => ({
      "#": index + 1,
      "اسم المعلم": session.teacher,
      "رقم المعلم": session.teacherPhone,
      "اسم الحصة": session.student,
      "التاريخ": session.date,
      "ميعاد البدء": session.start,  // Corrected
      "ميعاد الانتهاء": session.end, // Corrected
      "الاشتراك": session.subscription, // Added quotes
      "الحالة": session.status, // Added quotes
      "النشاط": session.active === "active" ? "يعمل" : "متوقف",
    }));
    

    // Create a new workbook and add the data
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Define custom column widths
    worksheet["!cols"] = [
      { wch: 5 }, // Column for "#"
      { wch: 30 }, // Column for "name"
      { wch: 30 }, // Column for "address"
      { wch: 35 }, // Column for "parentPhone"
      { wch: 25 }, // Column for "category"
      { wch: 20 }, // Column for "subscription"
      { wch: 20 }, // Column for "countClass"
      { wch: 20 }, // Column for "payment"
      { wch: 20 }, // Column for "status"
      { wch: 20 }, // Column for "status"
    ];

    // Append the customized worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sessions");

    // Export the file
    XLSX.writeFile(workbook, "sessions_data.xlsx");
  };

  // Fetch Sessions when the component mounts or when refetch is called
  useEffect(() => {
    // refetchSessions();
    setSessions(sessionsStore);
    setFilterSessions(sessionsStore);
  }, [refetchSessions]); // Empty dependency array to only call refetch once on mount

  const handleFilterSessions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.toLowerCase();

    const filteredSessions = sessions.filter(
      (session: SessionsSec) => session.teacher.toLowerCase().includes(text) // Allows partial matching
    );

    console.log("text", text);
    console.log("Sessions", sessions);
    console.log("filteredSessions", filteredSessions);
    setFilterText(text);
    setFilterSessions(!text ? sessions : filteredSessions);
  };

  // Update Teachers when `data` changes
  useEffect(() => {
    if (dataSessions) {
      // setSessions(dataSessions);
    }
    console.log("dataSessions", dataSessions);
  }, [dataSessions]); // Only run this effect when `data` changes

  const handleOpenDelete = (id: number) => {
    setOpenDelete(id);
  };
  const handleCloseDelete = () => {
    setOpenDelete(null);
  };

  // Change session status
  const handleChangeStaus = async (id: number, status: string) => {
    const response = await changeState({
      url: `${apiUrl}/admin/session/status/${id}`,
      message: "تم تغير حالة الحصة",
      data: status,
    });

    if (response) {
      // Fix typo in prevSessions -> prevSessions
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === id ? { ...session, status: status } : session
        )
      );
    }
  };

  // Delete Category
  const handleDelete = async (id: number, name: string) => {
    const success = await deleteData(
      `${apiUrl}/admin/session/delete/${id}`,
      `${name} تم حذف الحصة.`
    );

    if (success) {
      // Update Sessions only if deleteData succeeded
      setSessions((prevSessions) =>
        prevSessions.filter((sessions) => sessions.id !== id)
      );
      // refetchSessions();
    }
  };

  const headers = [
    "#",
    "اسم المعلم",
    "رقم المعلم",
    "اسم الحصة",
    "التاريخ",
    "ميعاد البدء",
    "ميعاد الانتهاء",
    "الاشتراك",
    "الحالة",
    "النشاط",
    "ادوات",
  ];

  return (
    <div className="w-full flex items-start justify-start">
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex sm:flex-col lg:flex-row items-center justify-between gap-3">
          <div className="sm:w-full lg:w-1/3">
            <SearchBar
              value={filterText}
              handleChange={handleFilterSessions}
              placeholder="ابحث عن حصة"
            />
          </div>
          <div className="sm:w-full lg:w-2/3 flex sm:flex-wrap items-center sm:justify-between lg:justify-end gap-3">
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
            <SubmitButton
              type="button"
              text={"اضافة حصة"}
              handleClick={() => {
                navigate("/dashboard/sessions/add");
              }}
              withIcon={true}
              withShare={false}
              px="px-0"
              width="w-48"
              bgColor={"secondColor"}
              rounded="rounded-xl"
            />
          </div>
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
              {loadingSessions || loadingChange || loadingDelete ? (
                <tr>
                  <td colSpan={headers.length} className="py-4 text-center">
                    <StaticLoader />
                  </td>
                </tr>
              ) : filterSessions.length === 0 ? (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="py-4 text-center text-xl text-gray-600 font-TextFontMedium"
                  >
                    لا يوجد حصص
                  </td>
                </tr>
              ) : (
                currentSessions.map((session, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-center text-mainColor text-xl sm:text-base">
                      {(currentPage - 1) * SessionsPerPage + index + 1}
                    </td>

                    {/* Name */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {session?.teacher || "-"}
                    </td>
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {session?.teacherPhone || "-"}
                    </td>
                    {/* Phone */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {session?.student || "-"}
                    </td>
                    {/* Address */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {session?.date || "-"}
                    </td>
                    {/* Category */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {session?.start || "لم تبدا"}
                    </td>
                    {/* Subscription */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {session?.end|| "لم تنتهي"}
                    </td>
                    {/* Subscription */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {session?.subscription || "-"}
                    </td>
                    {/* Payment */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {session?.status || "-"}
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3 text-center">
                      <Switch
                        checked={session.active === "active"}
                        bgcolor={true}
                        handleClick={() =>
                          handleChangeStaus(
                            session.id,
                            session.active === "active" ? "unactive" : "active"
                          )
                        }
                      />
                    </td>
                    {/* Tools */}
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link to={`edit/${session.id}`}>
                          <EditIcon />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleOpenDelete(session.id)}
                        >
                          <DeleteIcon />
                        </button>
                        {openDelete === session.id && (
                          <Dialog
                            open={true}
                            onClose={handleCloseDelete}
                            className="relative z-10"
                          >
                            <DialogBackdrop className="fixed inset-0 bg-gray-500 opacity-30 transition-opacity" />
                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                  <div className="flex  flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <WarningIcon />
                                    <div className="flex items-center">
                                      <div className="text-center text-xl font-TextFontSemiBold text-gray-600">
                                        سوف يتم حذف حصة {session?.date || ""}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="px-4 py-3 sm:flex sm:flex-row sm:px-6">
                                    <button
                                      className="inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 cursor-pointer transition duration-300 px-6 py-3 text-xl font-TextFontSemiBold text-white shadow-sm sm:ml-3 sm:w-auto"
                                      onClick={() =>
                                        handleDelete(session.id, "")
                                      }
                                    >
                                      حذف
                                    </button>
                                    <button
                                      type="button"
                                      data-autofocus
                                      onClick={handleCloseDelete}
                                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 cursor-pointer text-xl font-TextFontMedium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                    >
                                      إلغاء
                                    </button>
                                  </div>
                                </DialogPanel>
                              </div>
                            </div>
                          </Dialog>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filterSessions.length > 10 && (
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

export default SessionsPage;
