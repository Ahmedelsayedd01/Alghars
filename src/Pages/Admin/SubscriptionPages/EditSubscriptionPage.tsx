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
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Subscriptions } from "../../../types";

interface SubscriptionProps {
  nameTitle: (name: string) => void;
}
const EditSubscriptionPage = ({nameTitle}:SubscriptionProps) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { subscriptionId } = useParams();
  const subscriptionsStore = useSelector((state: any) => state.subscriptions.data);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const { postData, loadingPost, response } = usePost({
    url: `${apiUrl}/admin/subscriptions/create`,
  });

  const [subscriptions, setSubscriptions] = useState<Subscriptions[]>([]);
  const [subscriptionName, setSubscriptionName] = useState("");
  const [subscriptionSessionsCount, setSubscriptionSessionsCount] =
    useState("");
  const [subscriptionPrice, setSubscriptionPrice] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState(0);




  useEffect(() => {
    if (subscriptionsStore.length > 0) {
      setSubscriptions(subscriptionsStore);
    }
  }, [subscriptionsStore]);

  useEffect(() => {
    if (subscriptionId) {
      const subscription = subscriptionsStore.find(
        (subscription: Subscriptions) => subscription.id === parseInt(subscriptionId)
      );
      if (subscription) {
        nameTitle(subscription.name);
        setSubscriptionName(subscription.name);
        setSubscriptionSessionsCount(subscription.sessions);
        setSubscriptionPrice(subscription.price);
        setSubscriptionStatus(subscription.status === "active" ? 1 : 0);
      }
    }
  }, [subscriptionId, subscriptions]);


  const handleSubscriptionStatus = () => {
    const Active = subscriptionStatus;
    {
      Active === 0 ? setSubscriptionStatus(1) : setSubscriptionStatus(0);
    }
  };


  useEffect(() => {
    if (response && response.status === 200) {
      navigate(-1 as any, { replace: true });
    }
    console.log("response", response);
  }, [response]);

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
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

    const payload = {
      name: subscriptionName,
      sessions: subscriptionSessionsCount,
      price: subscriptionPrice,
      subscriptionStatus: subscriptionStatus === 1 ? "active" : "inactive",
    };

    postData(payload, "تم تعديل الاشتراك بنجاح");
  };

  return (
    <>
      {loadingPost ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <form onSubmit={handleEdit}>
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
            <div className="sm:w-full lg:w-[26%] flex items-center justify-start gap-x-2 mt-7">
              <span className="text-2xl font-TextFontMedium text-thirdColor mt-2">
                الحالة:
              </span>
              {/* Subscription Status */}
              <Switch
                bgcolor={false}
                checked={subscriptionStatus === 1}
                handleClick={handleSubscriptionStatus}
              />
            </div>
          </div>
          {/* Button Add */}
          <div className="w-full flex justify-end items-center">
            <ButtonAdd handleClick={() => handleEdit} />
          </div>
        </form>
      )}
    </>
  );
};

export default EditSubscriptionPage;
