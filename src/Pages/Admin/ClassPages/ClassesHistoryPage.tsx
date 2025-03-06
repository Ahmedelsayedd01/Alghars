import { useEffect, useState } from "react";
import { useChangeState } from "../../../Hooks/useChangeState";
import { useDelete } from "../../../Hooks/useDelete";
// import { useGet } from "../../../Hooks/useGet";
import {
  StaticLoader,
  SubmitButton,
  Switch,
} from "../../../Components/Components";
import { Link } from "react-router-dom";
import { DeleteIcon, EditIcon, WarningIcon } from "../../../assets/Icons";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useSelector } from "react-redux";

const ClassesHistoryPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const teachersStore = useSelector((state: any) => state.teachers.data);
  // const {
  //   refetch: refetchTeachers,
  //   loading: loadingTeachers,
  //   data: dataTeachers,
  // } = useGet(`${apiUrl}/admin/teachers`);

  const { changeState, loadingChange, /* responseChange */ } = useChangeState();
  const { deleteData, loadingDelete, /* responseDelete */ } = useDelete();

  interface Teacher {
    id: number;
    // index: number;
    name: string;
    email: string;
    subject: string;
    phone: string;
    address: string;
    countClass: number;
    image_link: string;
    status: string;
  }

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [openDelete, setOpenDelete] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const TeachersPerPage = 10; // Limit to 10 Teachers per page

  // Calculate total number of pages
  const totalPages = Math.ceil(teachers.length / TeachersPerPage);

  // Get the Teachers for the current page
  const currentTeachers = teachers.slice(
    (currentPage - 1) * TeachersPerPage,
    currentPage * TeachersPerPage
  );

  // handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Fetch Teachers when the component mounts or when refetch is called
  useEffect(() => {
    // refetchTeachers();
    setTeachers(teachersStore);
  }, [teachersStore]); // Empty dependency array to only call refetch once on mount

  // View supp category

  const handleOpenDelete = (id: number) => {
    setOpenDelete(id);
  };
  const handleCloseDelete = () => {
    setOpenDelete(null);
  };

  // Change Teacher status
  const handleChangeStaus = async (id: number, status: string) => {
    const response = await changeState({
      url: `${apiUrl}/admin/teacher/status/${id}`,
      message: "statusChange",
      data: status,
    });

    if (response) {
      // Fix typo in prevteachers -> prevTeachers
      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher.id === id ? { ...teacher, status: status } : teacher
        )
      );
    }
  };

  // Delete Category
  const handleDelete = async (id: number, name: string) => {
    const success = await deleteData(
      `${apiUrl}/admin/teacher/${id}`,
      `${name} Deleted Success.`
    );

    if (success) {
      // Update Teachers only if deleteData succeeded
      setTeachers((prevTeachers) =>
        prevTeachers.filter((teacher) => teacher.id !== id)
      );
      // refetchTeachers();
    }
  };

  // Update Teachers when `data` changes
  // useEffect(() => {
  //   if ((dataTeachers as any).teachers) {
  //     setTeachers((dataTeachers as any).teachers);
  //   }
  // }, [dataTeachers]); // Only run this effect when `data` changes

  const headers = [
    "#",
    "الصورة",
    "الاسم",
    "الهاتف",
    "العنوان",
    "الايميل",
    "المادة",
    "عدد الحصص",
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
            /* loadingTeachers || */ loadingChange || loadingDelete ? (
              <div className="w-full h-56 flex justify-center items-center">
                <StaticLoader />
              </div>
            ) : (
              <tbody className="w-full">
                {teachers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={12}
                      className="pt-2 text-center text-xl text-mainColor font-TextFontMedium  "
                    >
                      لا يوجد معلمين
                    </td>
                  </tr>
                ) : (
                  currentTeachers.map(
                    (
                      teacher,
                      index // Example with two rows
                    ) => (
                      <tr
                        className="w-full border-b-2 border-gray-300"
                        key={index}
                      >
                        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {(currentPage - 1) * TeachersPerPage + index + 1}
                        </td>
                        {/* Photo */}
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 overflow-hidden">
                          <div className="flex justify-center">
                            <img
                              src={teacher?.image_link || "-"}
                              className="bg-mainColor border-2 border-mainColor rounded-full min-w-14 min-h-14 max-w-14 max-h-14"
                              loading="lazy"
                              alt="Photo"
                            />
                          </div>
                        </td>
                        {/* Name */}
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {teacher?.name || "-"}
                        </td>
                        {/* Phone */}
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {teacher?.phone || "-"}
                        </td>
                        {/* Addrass */}
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {teacher?.address || "-"}
                        </td>
                        {/* Email */}
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {teacher?.email || "-"}
                        </td>
                        {/* Subject */}
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {teacher?.subject || "-"}
                        </td>
                        {/* Count Class */}
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {teacher?.countClass || 0}
                        </td>
                        {/* Status */}
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          <Switch
                            checked={teacher.status === 'active'}
                            bgcolor={true}
                            handleClick={() => {
                              handleChangeStaus(
                                teacher.id,
                                teacher.status === 'active' ? 'unactive' : 'active'
                              );
                            }}
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
                              className="cursor-pointer"
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
                                        <WarningIcon
                                          width="28"
                                          height="28"
                                          aria-hidden="true"
                                        />
                                        <div className="flex items-center">
                                          <div className="text-center text-xl font-TextFontSemiBold text-gray-600">
                                            سوف يتم حذف المعلم{" "}
                                            {teacher?.name || ""}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="px-4 py-3 sm:flex sm:flex-row sm:px-6">
                                        <button
                                          className="inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 cursor-pointer transition duration-300 px-6 py-3 text-sm font-TextFontSemiBold text-white shadow-sm sm:ml-3 sm:w-auto"
                                          onClick={() =>
                                            handleDelete(
                                              teacher.id,
                                              teacher.name
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
        {teachers.length > 10 && (
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

export default ClassesHistoryPage;
