import { useEffect, useRef, useState } from "react";
import {
  ButtonAdd,
  DropDown,
  NumberInput,
  StaticLoader,
  // Switch,
  TextInput,
  UploadInput,
} from "../../../Components/Components";
import { Obj, Subscriptions } from "../../../types";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../Context/Auth";
import { usePost } from "../../../Hooks/usePost";
import { useGet } from "../../../Hooks/useGet";
import { setSubscriptionsStore } from "../../../Store/CreateSlices";

interface HandleImageClickProps {
  ref: React.RefObject<HTMLInputElement>;
}

const AddStudentPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const studentPhoto = useRef<HTMLInputElement>(null!);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  /* Get Subscriptions */
  const {
    refetch: refetchSubscriptions,
    loading: loadingSubscriptions,
    data: dataSubscriptions,
  } = useGet<Subscriptions>(`${apiUrl}/admin/package/show`);

  const { postData, loadingPost, response } = usePost({
    url: `${apiUrl}/admin/student/create`,
  });

  const [studentName, setStudentName] = useState("");
  const [studentAddress, setStudentAddress] = useState("");
  const [studentParentPhone, setStudentParentPhone] = useState("");
  const [studentCategory, setStudentCategory] = useState("");
  const [studentSubscription, setStudentSubscription] = useState<Obj | null>(
    null
  );
  const [subscriptions, setSubscriptions] = useState<Subscriptions[]>([]);
  const [price, setPrice] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<Obj | null>(null);

  const [payments] = useState<Obj[]>([
    {
      id: 0,
      name: "تقسيط",
    },
    {
      id: 1,
      name: "لم يتم الدفع",
    },
    {
      id: 2,
      name: "تم الدفع",
    },
  ]);

  const [studentPhotoName, setStudentPhotoName] = useState("");
  const [studentPhotoFile, setStudentPhotoFile] = useState<File | null>(null);

  // const [studentStatus, setStudentStatus] = useState(0);

  useEffect(() => {
    refetchSubscriptions();
  }, [refetchSubscriptions]);

  useEffect(() => {
    if (dataSubscriptions) {
      dispatch(setSubscriptionsStore(dataSubscriptions));
      setSubscriptions(dataSubscriptions);
    }
  }, [dataSubscriptions]);

  interface HandleImageChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

  const handleImageChange = (e: HandleImageChangeEvent) => {
    const file = e.target.files?.[0];
    if (file) {
      setStudentPhotoFile(file);
      setStudentPhotoName(file.name);
    }
  };

  const handleImageClick = ({ ref }: HandleImageClickProps) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  // const handleStudentStatus = () => {
  //   const Active = studentStatus;
  //   {
  //     setStudentStatus(Active === 0 ? 1 : 0);
  //   }
  // };

  const handleReset = () => {
    setStudentName("");
    setStudentParentPhone("");
    setStudentAddress("");
    setStudentPhotoFile(null);
    setStudentPhotoName("");
    setStudentCategory("");
    setStudentSubscription(null);
    setSelectedPayment(null);
    setPrice("");
    // setStudentStatus(0);
  };

  useEffect(() => {
    if (response && response.data.status === "success") {
      handleReset();
    }
    console.log("response", response);
  }, [response]);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!studentName) {
      auth.toastError("اضف اسم الطالب");
      return;
    }
    if (!studentAddress) {
      auth.toastError("اضف عنوان الطالب");
      return;
    }
    if (!studentParentPhone) {
      auth.toastError("اضف هاتف ولي الامر");
      return;
    }
    if (!studentCategory) {
      auth.toastError("اضف المرحلة الدراسية");
      return;
    }
    if (!studentPhotoFile) {
      auth.toastError("اضف صورة الطالب");
      return;
    }
    // if (!studentSubscription) {
    //   auth.toastError("اضف الاشتراك");
    //   return;
    // }
    if (!selectedPayment) {
      auth.toastError("اضف حالة الدفع");
      return;
    }
    if (!price) {
      auth.toastError("اضف المبلغ");
      return;
    }

    const formData = new FormData();

    formData.append("name", studentName);
    formData.append("parent_phone", studentParentPhone);
    formData.append("address", studentAddress);
    formData.append("category", studentCategory);
    formData.append(
      "package_id",
      studentSubscription ? studentSubscription.id.toString() : ""
    );
    formData.append("avatar", studentPhotoFile);
    formData.append("price", price);
    formData.append("payment_method", selectedPayment.id.toString());
    // formData.append("status", studentStatus === 1 ? "active" : "inactive");
    // formData.append("status", "inactive");

    postData(formData, "تم اضافة الطالب بنجاح");
  };

  return (
    <>
      {loadingSubscriptions || loadingPost ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <form onSubmit={handleAdd}>
          <div className="w-full flex flex-wrap sm:flex-col lg:flex-row items-center justify-start gap-4 sm:mb-8 lg:mb-0">
            {/* Student Name */}
            <TextInput
              title={"اسم الطالب:"}
              value={studentName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStudentName(e.target.value)
              }
              placeholder="ادخل اسم الطالب"
            />

            {/* Student Address */}
            <TextInput
              title={" العنوان:"}
              value={studentAddress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStudentAddress(e.target.value)
              }
              placeholder="ادخل العنوان"
            />

            {/* Student Parent Phone */}
            <NumberInput
              title={"رقم ولي الأمر:"}
              value={studentParentPhone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStudentParentPhone(e.target.value)
              }
              placeholder="ادخل رقم ولي الأمر"
            />

            {/* Student Category */}
            <TextInput
              title={" المرحلة الدراسية:"}
              value={studentCategory}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStudentCategory(e.target.value)
              }
              placeholder="ادخل المرحلة الدراسية"
            />

            {/* Student Photo */}
            <div className="sm:w-full lg:w-[26%] flex flex-col items-start justify-center gap-y-2">
              <span className="text-xl font-TextFontMedium text-thirdColor">
                الصورة:
              </span>
              <UploadInput
                value={studentPhotoName}
                uploadFileRef={studentPhoto}
                placeholder="اختر صورة"
                handleFileChange={handleImageChange}
                onClick={() => handleImageClick({ ref: studentPhoto })}
              />
            </div>

            {/* Studens Subscriptions*/}
            <DropDown
              title={"الاشتراك:"}
              value={studentSubscription}
              onChange={(e: { value: Obj }) =>
                setStudentSubscription(e.value as Obj)
              }
              items={subscriptions}
              placeholder={"اختر الاشتراك"}
            />
            {/* Student payment*/}
            <DropDown
              title={"حالة الدفع:"}
              value={selectedPayment}
              onChange={(e: { value: Obj }) => setSelectedPayment(e.value)}
              items={payments}
              placeholder={"اختر حالة الدفع"}
            />

            {/* Student Price */}
            <NumberInput
              title={"المبلغ:"}
              value={price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrice(e.target.value)
              }
              placeholder="ادخل المبلغ"
            />

              {/* Student Status */}
            {/* <div className="sm:w-full lg:w-[26%] flex items-center justify-start gap-x-2 mt-7">
              <span className="text-2xl font-TextFontMedium text-thirdColor mt-2">
                الحالة:
              </span>
              <Switch
                bgcolor={false}
                checked={studentStatus === 1}
                handleClick={handleStudentStatus}
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

export default AddStudentPage;
