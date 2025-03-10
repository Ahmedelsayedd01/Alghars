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
import { DeleteIcon, EditIcon, WarningIcon } from "../../../assets/Assets";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useSelector } from "react-redux";
import { Subscriptions } from "../../../types";

const SubscriptionsPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const SubscriptionsStore = useSelector(
    (state: any) => state.subscriptions.data
  );
  // const {
  //   refetch: refetchSubscriptions,
  //   loading: loadingSubscriptions,
  //   data: dataSubscriptions,
  // } = useGet(`${apiUrl}/admin/subscriptions/show`);

  const { changeState, loadingChange /* responseChange */ } = useChangeState();
  const { deleteData, loadingDelete /* responseDelete */ } = useDelete();

  const [subscriptions, setSubscriptions] = useState<Subscriptions[]>([]);
  const [openDelete, setOpenDelete] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const subscriptionsPerPage = 10; // Limit to 10 Subscriptions per page

  // Calculate total number of pages
  const totalPages = Math.ceil(subscriptions.length / subscriptionsPerPage);

  // Get the Subscriptions for the current page
  const currentSubscriptions = subscriptions.slice(
    (currentPage - 1) * subscriptionsPerPage,
    currentPage * subscriptionsPerPage
  );

  // handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Fetch Subscriptions when the component mounts or when refetch is called
  useEffect(() => {
    // refetchSubscriptions();
    setSubscriptions(SubscriptionsStore);
  }, [SubscriptionsStore]); // Empty dependency array to only call refetch once on mount

  // View supp category

  const handleOpenDelete = (id: number) => {
    setOpenDelete(id);
  };
  const handleCloseDelete = () => {
    setOpenDelete(null);
  };

  // Change subscription status
  const handleChangeStaus = async (id: number, status: string) => {
    const response = await changeState({
      url: `${apiUrl}/admin/subscription/status/${id}`,
      message: "statusChange",
      data: status,
    });

    if (response) {
      // Fix typo in prevSubscription -> prevSubscription
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.map((subscription) =>
          subscription.id === id
            ? { ...subscription, status: status }
            : subscription
        )
      );
    }
  };

  // Delete Category
  const handleDelete = async (id: number, name: string) => {
    const success = await deleteData(
      `${apiUrl}/admin/subscription/${id}`,
      `${name} Deleted Success.`
    );

    if (success) {
      // Update Subscriptions only if deleteData succeeded
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.filter((subscription) => subscription.id !== id)
      );
      // refetchSubscriptions();
    }
  };

  // Update Subscriptions when `data` changes
  // useEffect(() => {
  //   if ((dataSubscriptions as any).Subscriptions) {
  //     setSubscriptions((dataSubscriptions as any).Subscriptions);
  //   }
  // }, [dataSubscriptions]); // Only run this effect when `data` changes

  const headers = ["#", "الاسم", "عدد الحصص", "السعر", "الحالة", "ادوات"];
  return (
    <div className="w-full flex items-start justify-start">
      <div className="w-full flex flex-col">
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
              {
                /* loadingSubscriptions || */ loadingChange || loadingDelete ? (
                  <tr>
                    <td colSpan={headers.length} className="py-4 text-center">
                      <StaticLoader />
                    </td>
                  </tr>
                ) : subscriptions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={headers.length}
                      className="py-4 text-center text-xl text-gray-600 font-TextFontMedium"
                    >
                      لا يوجد اشتراكات
                    </td>
                  </tr>
                ) : (
                  currentSubscriptions.map(
                    (
                      subscription,
                      index // Example with two rows
                    ) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-center text-mainColor text-xl sm:text-base">
                          {(currentPage - 1) * subscriptionsPerPage + index + 1}
                        </td>
                        {/* Name */}
                        <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                          {subscription?.name || "-"}
                        </td>
                        {/* Sessions Count */}
                        <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                          {subscription?.sessions || "-"}
                        </td>
                        {/* price */}
                        <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                          {subscription?.price || "-"}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3 text-center text-xl sm:text-base text-mainColor whitespace-nowrap overflow-hidden text-ellipsis">
                          <Switch
                            checked={subscription.status === "active"}
                            bgcolor={true}
                            handleClick={() => {
                              handleChangeStaus(
                                subscription.id,
                                subscription.status === "active"
                                  ? "unactive"
                                  : "active"
                              );
                            }}
                          />
                        </td>

                        {/* Tools */}
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Link to={`edit/${subscription.id}`}>
                              <EditIcon />
                            </Link>
                            <button
                              type="button"
                              className="cursor-pointer"
                              onClick={() => handleOpenDelete(subscription.id)}
                            >
                              <DeleteIcon />
                            </button>
                            {openDelete === subscription.id && (
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
                                            سوف يتم حذف الاشتراك{" "}
                                            {subscription?.name || ""}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="px-4 py-3 sm:flex sm:flex-row sm:px-6">
                                        <button
                                          className="inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 cursor-pointer transition duration-300 px-6 py-3 text-sm font-TextFontSemiBold text-white shadow-sm sm:ml-3 sm:w-auto"
                                          onClick={() =>
                                            handleDelete(
                                              subscription.id,
                                              subscription.name
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
                )
              }
            </tbody>
          </table>
        </div>
        {subscriptions.length > 10 && (
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

export default SubscriptionsPage;
