import { useEffect, useRef, useState } from "react";
import {
  ButtonAdd,
  DropDown,
  EmailInput,
  NumberInput,
  PasswordInput,
  Switch,
  TextInput,
  UploadInput,
} from "../../../Components/Components";
import { Obj } from "../../../types";

interface HandleImageClickProps {
  ref: React.RefObject<HTMLInputElement>;
}

const AddStudentPage = () => {
  const studentPhoto = useRef<HTMLInputElement>(null!);

  const [studentName, setStudentName] = useState("");
  const [studentAddress, setStudentAddress] = useState("");
  const [studentParentPhone, setStudentParentPhone] = useState("");
  const [studentCategory, setStudentCategory] = useState("");
  const [studentSubscription, setStudentSubscription] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<Obj | null>(null);
  const [payments] = useState<Obj[]>([
    {
      id: 1,
      name: "تم الدفع",
    },
    {
      id: 2,
      name: "تقسيط",
    },
    {
      id: 3,
      name: "لم يتم الدفع",
    },
  ]);

  const [studentPhotoName, setstudentPhotoName] = useState("");
  const [studentPhotoFile, setstudentPhotoFile] = useState<File | null>(null);

  const [studentStatus, setStudentStatus] = useState(0);

  useEffect(() => {
    console.log("selectedPayment", selectedPayment);
  }, [selectedPayment]);

  interface HandleImageChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

  const handleImageChange = (e: HandleImageChangeEvent) => {
    const file = e.target.files?.[0];
    if (file) {
      setstudentPhotoFile(file);
      setstudentPhotoName(file.name);
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
      Active === 0 ? setStudentStatus(1) : setStudentStatus(0);
    }
  };

  const handleAdd = () => {};

  return (
    <form>
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

        {/* Student Subscription */}
        <NumberInput
          title={" عدد حصص الاشتراك:"}
          value={studentSubscription}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setStudentSubscription(e.target.value)
          }
          placeholder="ادخل عدد حصص الاشتراك"
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

        {/* Student payment*/}
        <DropDown
          title={"حالة الدفع:"}
          value={selectedPayment}
          onChange={(e: { value: Obj }) => setSelectedPayment(e.value)}
          items={payments}
          placeholder={"اختر حالة الدفع"}
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
        <ButtonAdd handleClick={handleAdd} />
      </div>
    </form>
  );
};

export default AddStudentPage;
