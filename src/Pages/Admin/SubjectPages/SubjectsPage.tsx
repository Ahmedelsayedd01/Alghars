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
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiErrorWarningLine } from "react-icons/ri";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useSelector } from "react-redux";
import { Subjects } from "../../../types";

const SubjectsPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const subjectsStore = useSelector((state: any) => state.subjects.data);
  // const {
  //   refetch: refetchSubjects,
  //   loading: loadingSubjects,
  //   data: dataSubjects,
  // } = useGet(`${apiUrl}/admin/subjects`);

  const { changeState, loadingChange /* responseChange */ } = useChangeState();
  const { deleteData, loadingDelete /* responseDelete */ } = useDelete();

  const [subjects, setSubjects] = useState<Subjects[]>([]);
  const [openDelete, setOpenDelete] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const subjectsPerPage = 10; // Limit to 10 Subjects per page

  // Calculate total number of pages
  const totalPages = Math.ceil(subjects.length / subjectsPerPage);

  // Get the Subjects for the current page
  const currentSubjects = subjects.slice(
    (currentPage - 1) * subjectsPerPage,
    currentPage * subjectsPerPage
  );

  // handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Fetch Subjects when the component mounts or when refetch is called
  useEffect(() => {
    // refetchSubjects();
    setSubjects(subjectsStore);
  }, [subjectsStore]); // Empty dependency array to only call refetch once on mount

  // View supp category

  const handleOpenDelete = (id: number) => {
    setOpenDelete(id);
  };
  const handleCloseDelete = () => {
    setOpenDelete(null);
  };

  // Change subject status
  const handleChangeStaus = async (id: number, status: string) => {
    const response = await changeState({
      url: `${apiUrl}/admin/subject/status/${id}`,
      message: "statusChange",
      data: status,
    });

    if (response) {
      // Fix typo in prevSubject -> prevSubject
      setSubjects((prevSubjects) =>
        prevSubjects.map((subject) =>
          subject.id === id ? { ...subject, status: status } : subject
        )
      );
    }
  };

  // Delete Category
  const handleDelete = async (id: number, name: string) => {
    const success = await deleteData(
      `${apiUrl}/admin/subject/${id}`,
      `${name} Deleted Success.`
    );

    if (success) {
      // Update subjects only if deleteData succeeded
      setSubjects((prevSubjects) =>
        prevSubjects.filter((subject) => subject.id !== id)
      );
      // refetchSubjects();
    }
  };

  // Update subjects when `data` changes
  // useEffect(() => {
  //   if ((dataSubjects as any).subjects) {
  //     setSubjects((dataSubjects as any).subjects);
  //   }
  // }, [dataSubjects]); // Only run this effect when `data` changes

  const headers = ["#", "المادة", "الحالة", "ادوات"];
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
            /* loadingSubjects || */ loadingChange || loadingDelete ? (
              <div className="w-full h-56 flex justify-center items-center">
                <StaticLoader />
              </div>
            ) : (
              <tbody className="w-full">
                {subjects.length === 0 ? (
                  <tr>
                    <td
                      colSpan={12}
                      className="pt-2 text-center text-xl text-mainColor font-TextFontMedium  "
                    >
                      لا يوجد مواد
                    </td>
                  </tr>
                ) : (
                  currentSubjects.map(
                    (
                      subject,
                      index // Example with two rows
                    ) => (
                      <tr
                        className="w-full border-b-2 border-gray-300"
                        key={index}
                      >
                        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {(currentPage - 1) * subjectsPerPage + index + 1}
                        </td>
                        {/* Name */}
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {subject?.name || "-"}
                        </td>

                        {/* Status */}
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-mainColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          <Switch
                            checked={subject.status === "active"}
                            bgcolor={true}
                            handleClick={() => {
                              handleChangeStaus(
                                subject.id,
                                subject.status === "active"
                                  ? "unactive"
                                  : "active"
                              );
                            }}
                          />
                        </td>

                        {/* Tools */}
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Link to={`edit/${subject.id}`}>
                              <CiEdit color="green" size={25} />
                            </Link>
                            <button
                              type="button"
                              className="cursor-pointer"
                              onClick={() => handleOpenDelete(subject.id)}
                            >
                              <MdDeleteOutline color="red" size={25} />
                            </button>
                            {openDelete === subject.id && (
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
                                        <RiErrorWarningLine
                                          color="red"
                                          size={200}
                                        />
                                        <div className="flex items-center">
                                          <div className="text-center text-xl font-TextFontSemiBold text-gray-600">
                                            سوف يتم حذف المادة{" "}
                                            {subject?.name || ""}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="px-4 py-3 sm:flex sm:flex-row sm:px-6">
                                        <button
                                          className="inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 cursor-pointer transition duration-300 px-6 py-3 text-sm font-TextFontSemiBold text-white shadow-sm sm:ml-3 sm:w-auto"
                                          onClick={() =>
                                            handleDelete(
                                              subject.id,
                                              subject.name
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
        {subjects.length > 10 && (
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

export default SubjectsPage;
