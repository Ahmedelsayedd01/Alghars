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
import { useDispatch } from "react-redux";
import {  SessionsSec, Teachers } from "../../../types";
import { DeleteIcon, EditIcon, WarningIcon } from "../../../assets/Assets";
import * as XLSX from "xlsx";
import { setTeachersStore } from "../../../Store/CreateSlices";

const TeachersPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    refetch: refetchTeachers,
    loading: loadingTeachers,
    data: dataTeachers,
  } = useGet<Teachers>(`${apiUrl}/admin/teacher/show`);

  const { changeState, /*loadingChange , responseChange */ } = useChangeState();
  const { deleteData, /*loadingDelete , responseDelete */ } = useDelete();

  const [teachers, setTeachers] = useState<Teachers[]>([]);
  const [filterTeachers, setFilterTeachers] = useState<Teachers[]>([]);
  const [filterText, setFilterText] = useState<string>("");

  const [openDelete, setOpenDelete] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const TeachersPerPage = 10; // Limit to 10 Teachers per page
  // Calculate total number of pages
  const totalPages = Math.ceil(filterTeachers.length / TeachersPerPage);

  // Get the Teachers for the current page
  const currentTeachers = filterTeachers.slice(
    (currentPage - 1) * TeachersPerPage,
    currentPage * TeachersPerPage
  );

  // handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleShare = () => {
    const data = filterTeachers.map((teacher: Teachers, index: number) => ({
      "#": index + 1,
      " الاسم ": `${teacher?.name || "-"}`,
      " العنوان ": `${teacher?.address || "-"}`,
      " الهاتف ": `${teacher?.phone || "-"}`,
      " الايميل ": `${teacher?.email || "-"}`,
      "عدد الحصص": `${teacher?.sessionCount || "-"}`,
      " الحالة ": teacher.status === "active" ? "يعمل" : "متوقف",
    }));

    // Create a new workbook and add the data
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Define custom column widths
    worksheet["!cols"] = [
      { wch: 5 }, // Column for "#"
      { wch: 20 }, // Column for "Name"
      { wch: 30 }, // Column for "Address"
      { wch: 20 }, // Column for "Phone"
      { wch: 25 }, // Column for "Email"
      { wch: 5 }, // Column for "CountClass"
      { wch: 10 }, // Column for "Status"
    ];

    // Append the customized worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, "Teachers");

    // Export the file
    XLSX.writeFile(workbook, "teachers_data.xlsx");
  };

  // Fetch Teachers when the component mounts or when refetch is called
  useEffect(() => {
    refetchTeachers();
  }, [refetchTeachers]); // Empty dependency array to only call refetch once on mount

  useEffect(() => {
    if (dataTeachers) {
      dispatch(setTeachersStore(dataTeachers));
      setTeachers(dataTeachers);
      setFilterTeachers(dataTeachers);
    }
    console.log("teachersStore", dataTeachers);
    console.log("dataTeachers", dataTeachers);
  }, [dataTeachers]);

  const handleFilterTeachers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.toLowerCase();

    const filteredTeachers = teachers.filter(
      (teacher: Teachers) => teacher.name.toLowerCase().includes(text) // Allows partial matching
    );

    console.log("text", text);
    console.log("teachers", teachers);
    console.log("filteredTeachers", filteredTeachers);
    setFilterText(text);
    setFilterTeachers(!text ? teachers : filteredTeachers);
  };

  // Update Teachers when `data` changes
  useEffect(() => {
    if (dataTeachers) {
      dispatch(setTeachersStore(dataTeachers));
    }
    console.log("dataTeachers", dataTeachers);
  }, [dataTeachers]); // Only run this effect when `data` changes

  const handleOpenDelete = (id: number) => {
    setOpenDelete(id);
  };
  const handleCloseDelete = () => {
    setOpenDelete(null);
  };

  // Change Teacher status
  const handleChangeStaus = async (
    id: number,
    name: string,
    status: string
  ) => {
    const data = { status };
    const response = await changeState({
      url: `${apiUrl}/admin/teacher/update/${id}`,
      message: `تم تغير حالة المعلم ${name}`,
      data,
    });

    if (response) {
      // Fix typo in prevteachers -> prevTeachers
      setFilterTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher.id === id ? { ...teacher, status: status } : teacher
        )
      );
    }
  };

  // Delete Category
  const handleDelete = async (id: number, name: string) => {
    const success = await deleteData(
      `${apiUrl}/admin/teacher/delete/${id}`,
      `تم حذف المعلم ${name} .`
    );

    if (success) {
      setOpenDelete(null)
      // Update Teachers only if deleteData succeeded
      setFilterTeachers((prevTeachers) =>
        prevTeachers.filter((teacher) => teacher.id !== id)
      );
      // refetchTeachers();
    }
  };

  const headers = [
    "#",
    "الصورة",
    "الاسم",
    "الهاتف",
    "العنوان",
    "الايميل",
    "عدد الحصص",
    "الحالة",
    "ادوات",
  ];
  return (
    <div className="w-full flex items-start justify-start">
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex sm:flex-col lg:flex-row items-center justify-between gap-3">
          <div className="sm:w-full lg:w-1/3">
            <SearchBar
              value={filterText}
              handleChange={handleFilterTeachers}
              placeholder="ابحث عن معلم"
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
              text={"اضافة معلم"}
              handleClick={() => {
                navigate("/dashboard/teachers/add");
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
              {loadingTeachers /* || loadingChange || loadingDelete */ ? (
                <tr>
                  <td colSpan={headers.length} className="py-4 text-center">
                    <StaticLoader />
                  </td>
                </tr>
              ) : filterTeachers.length === 0 ? (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="py-4 text-center text-xl text-gray-600 font-TextFontMedium"
                  >
                    لا يوجد معلمين
                  </td>
                </tr>
              ) : (
                currentTeachers.map((teacher, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-center text-mainColor text-xl sm:text-base">
                      {(currentPage - 1) * TeachersPerPage + index + 1}
                    </td>
                    {/* Teacher Photo */}
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center">
                        <img
                          src={teacher?.avatar || "-"}
                          className="w-14 h-14 rounded-full border-2 border-mainColor"
                          loading="lazy"
                          alt="Photo"
                        />
                      </div>
                    </td>
                    {/* Name */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {teacher?.name || "-"}
                    </td>
                    {/* Phone */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {teacher?.phone || "-"}
                    </td>
                    {/* Address */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {teacher?.address || "-"}
                    </td>
                    {/* Email */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {teacher?.email || "-"}
                    </td>
                    {/* Count Class */}
                    <td className="px-4 py-3 text-center">
                      <Link
                        to={`sessions/${teacher.id}`}
                        className="text-xl text-mainColor border-b-2 font-TextFontSemiBold hover:text-thirdColor"
                      >
                        {/* {teacher?.sessionCount || 0} */}
                        {Array.isArray(teacher?.sessions)
                          ? teacher.sessions.filter(
                              (ses: SessionsSec) => ses.status === "done"
                            ).length
                          : 0}
                      </Link>
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3 text-center">
                      <Switch
                        checked={teacher.status === "active"}
                        bgcolor={true}
                        handleClick={() =>
                          handleChangeStaus(
                            teacher.id,
                            teacher.name,
                            teacher.status === "active" ? "inactive" : "active"
                          )
                        }
                      />
                    </td>
                    {/* Tools */}
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link to={`edit/${teacher.id}`}>
                          <EditIcon />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleOpenDelete(teacher.id)}
                        >
                          <DeleteIcon />
                        </button>
                        {openDelete === teacher.id && (
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
                                        سوف يتم حذف المعلم {teacher?.name || ""}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="px-4 py-3 sm:flex sm:flex-row sm:px-6">
                                    <button
                                      className="inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 cursor-pointer transition duration-300 px-6 py-3 text-xl font-TextFontSemiBold text-white shadow-sm sm:ml-3 sm:w-auto"
                                      onClick={() =>
                                        handleDelete(teacher.id, teacher.name)
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

        {filterTeachers.length > 10 && (
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

export default TeachersPage;
