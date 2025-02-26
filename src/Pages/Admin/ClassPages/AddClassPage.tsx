import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
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

const AddClassPage = () => {
  const teacherPhoto = useRef<HTMLInputElement>(null!);

  const [teacherName, setTeacherName] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");
  const [teacherAddress, setTeacherAddress] = useState("");

  const [teacherPhotoName, setTeacherPhotoName] = useState("");
  const [teacherPhotoFile, setTeacherPhotoFile] = useState<File | null>(null);

  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");

  const [teacherStatus, setTeacherStatus] = useState(0);

  const [selectedSubject, setSelectedSubject] = useState<Obj | null>(null);
  const subjects: Obj[] = [
    { name: "لندن", id: 1 },
    { name: "لاسان", id: 2 },
    { name: "يوسكو", id: 3 },
    { name: "صو", id: 4 },
    { name: "بارس", id: 5 },
  ];

  useEffect(() => {
    console.log("selectedSubject", selectedSubject);
  }, [selectedSubject]);

  interface HandleImageChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

  const handleImageChange = (e: HandleImageChangeEvent) => {
    const file = e.target.files?.[0];
    if (file) {
      setTeacherPhotoFile(file);
      setTeacherPhotoName(file.name);
    }
  };

  const handleImageClick = ({ ref }: HandleImageClickProps) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleTeacherStatus = () => {
    const Active = teacherStatus;
    {
      Active === 0 ? setTeacherStatus(1) : setTeacherStatus(0);
    }
  };

  const handleAdd = () => {};

  return (
    <form>
      <div className="w-full flex flex-wrap sm:flex-col lg:flex-row items-center justify-start gap-4 sm:mb-8 lg:mb-0">
        {/* Teacher Name */}
        <TextInput
          title={"اسم المعلم:"}
          value={teacherName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTeacherName(e.target.value)
          }
          placeholder="ادخل اسم المعلم"
        />

        {/* Teacher Address */}
        <TextInput
          title={" العنوان:"}
          value={teacherAddress}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTeacherAddress(e.target.value)
          }
          placeholder="ادخل العنوان"
        />

        {/* Teacher Phone */}
        <NumberInput
          title={"رقم الهاتف:"}
          value={teacherPhone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTeacherPhone(e.target.value)
          }
          placeholder="ادخل رقم الهاتف"
        />

        {/* Teacher Photo */}
        <div className="sm:w-full lg:w-[26%] flex flex-col items-start justify-center gap-y-2">
          <span className="text-xl font-TextFontMedium text-thirdColor">
            الصورة:
          </span>
          <UploadInput
            value={teacherPhotoName}
            uploadFileRef={teacherPhoto}
            placeholder="اختر صورة"
            handleFileChange={handleImageChange}
            onClick={() => handleImageClick({ ref: teacherPhoto })}
          />
        </div>

        {/* Teacher Subject*/}
        <DropDown
          title={"المادة:"}
          value={selectedSubject}
          onChange={(e: { value: Obj }) => setSelectedSubject(e.value)}
          items={subjects}
          placeholder={"اختر المادة"}
        />

        {/* Teacher Email && Password */}
        <div className="sm:w-full lg:w-[26%] flex flex-col items-start justify-center gap-y-2">
          <span className="text-xl font-TextFontMedium text-thirdColor">
            البريد الالكتروني:
          </span>
          <EmailInput
            isSign={false}
            value={teacherEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTeacherEmail(e.target.value);
            }}
            placeholder="ادخل البريد الالكتروني"
            backgound="white"
          />
        </div>
        <div className="sm:w-full lg:w-[26%] flex flex-col items-start justify-center gap-y-1">
          <span className="text-xl font-TextFontMedium text-thirdColor">
            كلمة المرور:
          </span>
          <PasswordInput
            isSign={false}
            value={teacherPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTeacherPassword(e.target.value);
            }}
            placeholder="ادخل كلمة المرور"
            backgound="bg-white"
          />
        </div>
        <div className="sm:w-full lg:w-[26%] flex items-center justify-start gap-x-2 mt-7">
          <span className="text-2xl font-TextFontMedium text-thirdColor mt-2">
            الحالة:
          </span>
          {/* Teacher Status */}
          <Switch
          bgcolor={false}
            checked={teacherStatus === 1}
            handleClick={handleTeacherStatus}
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

export default AddClassPage;
