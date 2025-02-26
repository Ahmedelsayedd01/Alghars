import { useEffect, useState } from "react";
import { useChangeState } from "../../../Hooks/useChangeState";
import { useDelete } from "../../../Hooks/useDelete";
import { useGet } from "../../../Hooks/useGet";
import {
  StaticLoader,
  SubmitButton,
  Switch,
} from "../../../Components/Components";
import { Link } from "react-router-dom";
import { DeleteIcon, EditIcon, WarningIcon } from "../../../assets/Icons";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useSelector } from "react-redux";

const StudentsPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const studentsStore = useSelector((state: any) => state.students.data);
  // const {
  //   refetch: refetchStudents,
  //   loading: loadingStudents,
  //   data: dataStudents,
  // } = useGet(`${apiUrl}/admin/students`);

  const { changeState, loadingChange, responseChange } = useChangeState();
  const { deleteData, loadingDelete, responseDelete } = useDelete();

  interface Student {
    id: number;
    name: string;
    category: string;
    parentPhone: string;
    address: string;
    countClass: number;
    subscription: number;
    image_link: string;
    payment: string;
    status: number;
  }

  const [students, setStudents] = useState<Student[]>([]);
  const [openDelete, setOpenDelete] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const studentsPerPage = 10; // Limit to 10 Students per page

  // Calculate total number of pages
  const totalPages = Math.ceil(students.length / studentsPerPage);

  // Get the Students for the current page
  const currentStudents = students.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  // handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Fetch Students when the component mounts or when refetch is called
  useEffect(() => {
    // refetchStudents();
    setStudents(studentsStore);
  }, [studentsStore]); // Empty dependency array to only call refetch once on mount

  // View supp category

  const handleOpenDelete = (id: number) => {
    setOpenDelete(id);
  };
  const handleCloseDelete = () => {
    setOpenDelete(null);
  };

  // Change Student status
  const handleChangeStaus = async (id: number, status: number) => {
    const response = await changeState({
      url: `${apiUrl}/admin/student/status/${id}`,
      message: "statusChange",
      data: status,
    });

    if (response) {
      // Fix typo in prevStudents -> prevStudents
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === id ? { ...student, status: status } : student
        )
      );
    }
  };

  // Delete Category
  const handleDelete = async (id: number, name: string) => {
    const success = await deleteData(
      `${apiUrl}/admin/Student/${id}`,
      `${name} Deleted Success.`
    );

    if (success) {
      // Update Students only if deleteData succeeded
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
      // refetchStudents();
    }
  };

  // Update Students when `data` changes
  // useEffect(() => {
  //   if ((dataStudents as any).students) {
  //     setStudents((dataStudents as any).students);
  //   }
  // }, [dataStudents]); // Only run this effect when `data` changes

  const headers = [
    "#",
    "الصورة",
    "الاسم",
    "هاتف ولي الأمر",
    "العنوان",
    "المرحلة",
    "الاشتراك",
    "عدد الحصص",
    "الدفع",
    "الحالة",
    "ادوات",
  ];
  return (
    <div className="w-full flex items-start justify-start">
      <div className="w-full flex flex-col">
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
          {
            /* loadingStudents || */ loadingChange || loadingDelete ? (
              <div className="w-full h-56 flex justify-center items-center">
                <StaticLoader />
              </div>
            ) : (
              <tbody className="w-full">
                {students.length === 0 ? (
                  <tr>
                    <td
                      colSpan={12}
                      className="pt-2 text-center text-xl text-mainColor font-TextFontMedium  "
                    >
                      لا يوجد طلاب
                    </td>
                  </tr>
                ) : (
                  currentStudents.map(
                    (
                      student,
                      index // Example with two rows
                    ) => (
                      <tr
                        className="w-full border-b-2 border-gray-300"
                        key={index}
                      >
                        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {(currentPage - 1) * studentsPerPage + index + 1}
                        </td>
                        {/* Photo */}
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 overflow-hidden">
                          <div className="flex justify-center">
                            <img
                              src={student?.image_link || "-"}
                              className="bg-mainColor border-2 border-mainColor rounded-full min-w-14 min-h-14 max-w-14 max-h-14"
                              loading="lazy"
                              alt="Photo"
                            />
                          </div>
                        </td>
                        {/* Name */}
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {student?.name || "-"}
                        </td>
                        {/* Parent Phone */}
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {student?.parentPhone || "-"}
                        </td>
                        {/* Addrass */}
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {student?.address || "-"}
                        </td>
                        {/* Category */}
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {student?.category || "-"}
                        </td>
                        {/* Subscription */}
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {student?.subscription || 0}
                        </td>
                        {/* Count Class */}
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {student?.countClass || 0}
                        </td>
                        {/* Payment */}
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {student?.payment || 0}
                        </td>
                        {/* Status */}
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          <Switch
                            checked={student.status === 1}
                            bgcolor={true}
                            handleClick={() => {
                              handleChangeStaus(
                                student.id,
                                student.status === 1 ? 0 : 1
                              );
                            }}
                          />
                        </td>
                        {/* Tools */}
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Link to={`edit/${student.id}`}>
                              <EditIcon />
                            </Link>
                            <button
                              type="button"
                              className="cursor-pointer"
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
                                        <WarningIcon
                                          width="28"
                                          height="28"
                                          aria-hidden="true"
                                        />
                                        <div className="flex items-center">
                                          <div className="text-center text-xl font-TextFontSemiBold text-gray-600">
                                             سوف يتم حذف الطالب {student?.name || ""}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="px-4 py-3 sm:flex sm:flex-row sm:px-6">
                                        <button
                                          className="inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 cursor-pointer transition duration-300 px-6 py-3 text-sm font-TextFontSemiBold text-white shadow-sm sm:ml-3 sm:w-auto"
                                          onClick={() =>
                                            handleDelete(
                                              student.id,
                                              student.name
                                            )
                                          }
                                        >
                                          حذف
                                        </button>
                                        <button
                                          type="button"
                                          data-autofocus
                                          onClick={handleCloseDelete}
                                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 cursor-pointer text-sm font-TextFontMedium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
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
                    )
                  )
                )}
              </tbody>
            )
          }
        </table>
        {students.length > 10 && (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4">
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
