import { useEffect, useState } from "react";
import {
  ButtonAdd,
  NumberInput,
  StaticLoader,
  Switch,
  TextInput,
} from "../../../Components/Components";
import { useAuth } from "../../../Context/Auth";
import { usePost } from "../../../Hooks/usePost";

const AddSubscriptionPage = () => {
  const auth = useAuth();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const { postData, loadingPost, response } = usePost({
    url: `${apiUrl}/admin/package/create`,
  });

  const [subscriptionName, setSubscriptionName] = useState("");
  const [subscriptionSessionsCount, setSubscriptionSessionsCount] =
    useState("");
  const [subscriptionPrice, setSubscriptionPrice] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState(0);

  const handleSubscriptionStatus = () => {
    const Active = subscriptionStatus;
    {
      Active === 0 ? setSubscriptionStatus(1) : setSubscriptionStatus(0);
    }
  };

  const handleReset = () => {
    setSubscriptionName("");
    setSubscriptionSessionsCount("");
    setSubscriptionPrice("");
    setSubscriptionStatus(0);
  };

  useEffect(() => {
    if (response && response.data.message === "success") {
      handleReset();
    }
    console.log("response", response);
  }, [response]);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!subscriptionName) {
      auth.toastError("اضف اسم الاشتراك");
      return;
    }
    if (!subscriptionSessionsCount) {
      auth.toastError("اضف عدد الحصص ");
      return;
    }

    if (!subscriptionPrice) {
      auth.toastError("اضف المبلغ");
      return;
    }

    const formData = new FormData();
    formData.append("name", subscriptionName);
    formData.append("sessionCount", subscriptionSessionsCount);
    formData.append("price", subscriptionPrice);
    // formData.append('status', subscriptionStatus === 1 ? "active" : "inactive");
    formData.append("status", "active");

    postData(formData, "تم اضافة الاشتراك بنجاح");
  };

  return (
    <>
      {loadingPost ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <form onSubmit={handleAdd}>
          <div className="w-full flex flex-wrap sm:flex-col lg:flex-row items-center justify-start gap-4 sm:mb-8 lg:mb-0">
            {/* Subscription Name */}
            <TextInput
              title={"اسم الاشتراك:"}
              value={subscriptionName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSubscriptionName(e.target.value)
              }
              placeholder="ادخل اسم الاشتراك"
            />
            {/* Subscription Sessions Count */}
            <NumberInput
              title={"عدد الحصص:"}
              value={subscriptionSessionsCount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSubscriptionSessionsCount(e.target.value)
              }
              placeholder="ادخل عدد الحصص"
            />
            {/* Subscription Price */}
            <NumberInput
              title={"السعر:"}
              value={subscriptionPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSubscriptionPrice(e.target.value)
              }
              placeholder="ادخل السعر"
            />
            {/* Subscription Status */}
            {/* <div className="sm:w-full lg:w-[26%] flex items-center justify-start gap-x-2 mt-7">
              <span className="text-2xl font-TextFontMedium text-thirdColor mt-2">
                الحالة:
              </span>
              <Switch
                bgcolor={false}
                checked={subscriptionStatus === 1}
                handleClick={handleSubscriptionStatus}
              />
            </div> */}
          </div>
          {/* Button Add */}
          <div className="w-full flex justify-end items-center">
            <ButtonAdd handleClick={() => handleAdd} />
          </div>
        </form>
      )}
    </>
  );
};

export default AddSubscriptionPage;
