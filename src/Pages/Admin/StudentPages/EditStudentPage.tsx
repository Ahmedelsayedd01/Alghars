import { useEffect, useRef, useState } from "react";
import {
  ButtonAdd,
  DropDown,
  NumberInput,
  StaticLoader,
  Switch,
  TextInput,
  UploadInput,
} from "../../../Components/Components";
import { Obj, Subscriptions } from "../../../types";
import { useSelector } from "react-redux";
import { useAuth } from "../../../Context/Auth";
import { usePost } from "../../../Hooks/usePost";
import { useNavigate, useParams } from "react-router-dom";

interface HandleImageClickProps {
  ref: React.RefObject<HTMLInputElement>;
}
interface EditStudentPageProps {
  nameTitle: (name: string) => void;
}
const EditStudentPage = ({ nameTitle }: EditStudentPageProps) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { studentId } = useParams();
  const studentsStore = useSelector((state: any) => state.students.data);

  const studentPhoto = useRef<HTMLInputElement>(null!);

  const subscriptionsStore = useSelector((state: any) => state.subscriptions.data);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const { postData, loadingPost, response } = usePost({
    url: `${apiUrl}/admin/student/upadte/${studentId}`,
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

  const [studentStatus, setStudentStatus] = useState(0);

  useEffect(() => {
    if (subscriptionsStore.length > 0) {
      setSubscriptions(subscriptionsStore);
    }
  }, [subscriptionsStore]);

  useEffect(() => {
    if (studentId) {
      const student = studentsStore.find(
        (t: any) => t.id === parseInt(studentId)
      );
      if (student) {
        nameTitle(student.name);
        setStudentName(student.name);
        setStudentAddress(student.address);
        setStudentParentPhone(student.parentPhone);
        setStudentCategory(student.category);
        setStudentSubscription(
          subscriptions.find((subscription: Subscriptions) => subscription.name === student.subscription) || null
        );
        setPrice(student.price);
        setSelectedPayment(
          payments.find((pay: Obj) => pay.id === student.payment) || null
        );
        setStudentPhotoName(student.image_link);
        setStudentPhotoFile(student.image_link);
        setStudentStatus(student.status === "active" ? 1 : 0);
      }
    }
  }, [studentId, subscriptions]);

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

  const handleStudentStatus = () => {
    const Active = studentStatus;
    {
      setStudentStatus(Active === 0 ? 1 : 0);
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
    if (!studentSubscription) {
      auth.toastError("اختر الاشتراك");
      return;
    }
    if (!selectedPayment) {
      auth.toastError("اختر حالة الدفع");
      return;
    }
    if (!price) {
      auth.toastError("اضف المبلغ");
      return;
    }

    const payload = {
      name: studentName,
      parentPhone: studentParentPhone,
      address: studentAddress,
      avatar: studentPhotoFile ? studentPhotoFile.name : "",
      category: studentCategory,
      subscription: studentSubscription.id.toString(),
      price: price,
      payment: selectedPayment.id.toString(),
      status: studentStatus === 1 ? "active" : "inactive",
    };

    postData(payload, "تم تعديل الطالب بنجاح");
  };

  return (
    <>
      {loadingPost ? (
        <div className="w-full h-92 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <form onSubmit={handleEdit}>
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

            {/* Student Subscriptions*/}
            <DropDown
              title={"الاشتراك:"}
              value={studentSubscription}
              onChange={(e: { value: Obj }) => setStudentSubscription(e.value)}
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

            <div className="sm:w-full lg:w-[26%] flex items-center justify-start gap-x-2 mt-7">
              <span className="text-2xl font-TextFontMedium text-thirdColor mt-2">
                الحالة:
              </span>
              {/* Student Status */}
              <Switch
                bgcolor={false}
                checked={studentStatus === 1}
                handleClick={handleStudentStatus}
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

export default EditStudentPage;
