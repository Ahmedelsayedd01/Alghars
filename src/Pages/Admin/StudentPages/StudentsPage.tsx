import { useEffect, useState } from "react";
// import { useChangeState } from "../../../Hooks/useChangeState";
import { useDelete } from "../../../Hooks/useDelete";
import { useGet } from "../../../Hooks/useGet";
import {
  SearchBar,
  StaticLoader,
  SubmitButton,
  // Switch,
} from "../../../Components/Components";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
// import { useSelector } from "react-redux";
import { Students } from "../../../types";
import { DeleteIcon, EditIcon, WarningIcon } from "../../../assets/Assets";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import { setStudentsStore } from "../../../Store/CreateSlices";

const StudentsPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    refetch: refetchStudents,
    loading: loadingStudents,
    data: dataStudents /* : Students[] */,
  } = useGet<Students>(`${apiUrl}/admin/student/show`);

  // const { changeState /* loadingChange, responseChange */ } = useChangeState();
  const { deleteData /*loadingDelete , responseDelete */ } = useDelete();

  const [students, setStudents] = useState<Students[]>([]);
  const [filterStudents, setFilterStudents] = useState<Students[]>([]);
  const [filterText, setFilterText] = useState<string>("");

  const [openDelete, setOpenDelete] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const StudentsPerPage = 10; // Limit to 10 Students per page
  // Calculate total number of pages
  const totalPages = Math.ceil(filterStudents.length / StudentsPerPage);

  // Get the Students for the current page
  const currentStudents = filterStudents.slice(
    (currentPage - 1) * StudentsPerPage,
    currentPage * StudentsPerPage
  );

  // handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleShare = () => {
    const data = filterStudents.map((student: Students, index: number) => ({
      "#": index + 1,
      " الاسم ": `${student?.name || "-"}`,
      " العنوان ": `${student?.address || "-"}`,
      "هاتف ولي الأمر": `${student?.parent_phone || "-"}`,
      " المرحلة ": `${student?.category || "-"}`,
      " الاشتراك ": `${student?.subscription?.name || "-"}`,
      " السعر ": `${student?.price || 0}`,
      "عدد الحصص	": `${student?.sessionCount || "-"}`,
      " الدفع ": `${
        student?.payment_method === "0"
          ? "تقسيط"
          : student?.payment_method === "1"
          ? "لم يتم الدفع"
          : student?.payment_method === "2"
          ? "تم الدفع"
          : "-"
      }`,
      // " الحالة ": student.status === "active" ? "يعمل" : "متوقف",
    }));

    // Create a new workbook and add the data
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Define custom column widths
    worksheet["!cols"] = [
      { wch: 5 }, // Column for "#"
      { wch: 20 }, // Column for "name"
      { wch: 30 }, // Column for "address"
      { wch: 25 }, // Column for "parentPhone"
      { wch: 25 }, // Column for "category"
      { wch: 20 }, // Column for "subscription"
      { wch: 10 }, // Column for "countClass"
      { wch: 15 }, // Column for "payment"
      // { wch: 15 }, // Column for "status"
    ];

    // Append the customized worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    // Export the file
    XLSX.writeFile(workbook, "students_data.xlsx");
  };

  // Fetch Students when the component mounts or when refetch is called
  useEffect(() => {
    refetchStudents();
  }, [refetchStudents]); // Empty dependency array to only call refetch once on mount

  useEffect(() => {
    if (dataStudents) {
      dispatch(setStudentsStore(dataStudents));
      setStudents(dataStudents);
      setFilterStudents(dataStudents);
    }
    console.log("dataStudents", dataStudents);
  }, [dataStudents]); // Empty dependency array to only call refetch once on mount

  const handleFilterStudents = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.toLowerCase();

    const filteredStudents = students.filter(
      (student: Students) => student.name.toLowerCase().includes(text) // Allows partial matching
    );

    console.log("text", text);
    console.log("students", students);
    console.log("filteredStudents", filteredStudents);
    setFilterText(text);
    setFilterStudents(!text ? students : filteredStudents);
  };

  const handleOpenDelete = (id: number) => {
    setOpenDelete(id);
  };
  const handleCloseDelete = () => {
    setOpenDelete(null);
  };

  // Change Teacher status
  // const handleChangeStaus = async (id: number, status: string) => {
  //   const data = {
  //     status: status,
  //   };
  //   const response = await changeState({
  //     url: `${apiUrl}/admin/student/update/${id}`,
  //     message: "تم تغير حالة الطالب",
  //     data,
  //   });

  //   if (response) {
  //     // Fix typo in prevstudents -> prevStudents
  //     setFilterStudents((prevStudents) =>
  //       prevStudents.map((student) =>
  //         student.id === id ? { ...student, status: status } : student
  //       )
  //     );
  //   }
  // };

  // Delete Category
  const handleDelete = async (id: number, name: string) => {
    const success = await deleteData(
      `${apiUrl}/admin/student/delete/${id}`,
      `تم حذف الطالب ${name} بنجاح.`
    );

    if (success) {
      handleCloseDelete();
      // Update Students only if deleteData succeeded
      setFilterStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
      // refetchStudents();
    }
  };

  const headers = [
    "#",
    "الصورة",
    "الاسم",
    "هاتف ولي الأمر",
    "العنوان",
    "المرحلة",
    "الاشتراك",
    "عدد الحصص",
    "السعر",
    "طريقة الدفع",
    // "الحالة",
    "ادوات",
  ];

  return (
    <div className="w-full flex items-start justify-start">
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex sm:flex-col lg:flex-row items-center justify-between gap-3">
          <div className="sm:w-full lg:w-1/3">
            <SearchBar
              value={filterText}
              handleChange={handleFilterStudents}
              placeholder="ابحث عن طالب"
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
              text={"اضافة طالب"}
              handleClick={() => {
                navigate("/dashboard/students/add");
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
              {loadingStudents /* || loadingChange || loadingDelete  */ ? (
                <tr>
                  <td colSpan={headers.length} className="py-4 text-center">
                    <StaticLoader />
                  </td>
                </tr>
              ) : filterStudents.length === 0 ? (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="py-4 text-center text-xl text-gray-600 font-TextFontMedium"
                  >
                    لا يوجد طلاب
                  </td>
                </tr>
              ) : (
                currentStudents.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-center text-mainColor text-xl sm:text-base">
                      {(currentPage - 1) * StudentsPerPage + index + 1}
                    </td>
                    {/* student Photo */}
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center">
                        <img
                          src={student?.image_link || "-"}
                          className="w-14 h-14 rounded-full border-2 border-mainColor"
                          loading="lazy"
                          alt="Photo"
                        />
                      </div>
                    </td>
                    {/* Name */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {student?.name || "-"}
                    </td>
                    {/* Phone */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {student?.parent_phone || "-"}
                    </td>
                    {/* Address */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {student?.address || "-"}
                    </td>
                    {/* Category */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {student?.category || "-"}
                    </td>
                    {/* Subscription */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {student?.subscription?.name || "-"}
                    </td>
                    {/* Count Class */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {/* <Link
                        to={`sessions/${student.id}`}
                        className="text-xl text-mainColor border-b-2 font-TextFontSemiBold hover:text-thirdColor"
                      > */}
                      {/* {student?.countClass + "/" + student?.sessionsLimite} */}
                      { student?.sessionsLimite + '/' + student?.sessionCount}
                      {/* { student?.sessionsLimite} */}
                      {/* </Link> */}
                    </td>
                    {/* Price */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {student?.price || 0}
                    </td>
                    {/* Payment */}
                    <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                      {student?.payment_method === "0" && "تقسيط"}
                      {student?.payment_method === "1" && "لم يتم الدفع"}
                      {student?.payment_method === "2" && "تم الدفع"}
                    </td>
                    {/* Status */}
                    {/* <td className="px-4 py-3 text-center">
                      <Switch
                        checked={student.status === "active"}
                        bgcolor={true}
                        handleClick={() =>
                          handleChangeStaus(
                            student.id,
                            student.status === "active" ? "inactive" : "active"
                          )
                        }
                      />
                    </td> */}
                    {/* Tools */}
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link to={`edit/${student.id}`}>
                          <EditIcon />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleOpenDelete(student.id)}
                        >
                          <DeleteIcon />
                        </button>
                        {openDelete === student.id && (
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
                                        سوف يتم حذف الطالب {student?.name || ""}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="px-4 py-3 sm:flex sm:flex-row sm:px-6">
                                    <button
                                      className="inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 cursor-pointer transition duration-300 px-6 py-3 text-xl font-TextFontSemiBold text-white shadow-sm sm:ml-3 sm:w-auto"
                                      onClick={() =>
                                        handleDelete(student.id, student.name)
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

        {filterStudents.length > 10 && (
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

export default StudentsPage;
