import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ButtonAdd,
  DropDown,
  EmailInput,
  NumberInput,
  PasswordInput,
  TextInput,
} from "../../../Components/Components";
import { Obj } from "../../../types";

interface AddTeacherSectionProps {
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
}

const AddTeacherSection: React.FC<AddTeacherSectionProps> = (
  {
    //   update,
    //   setUpdate,
  }
) => {
  const [teacherName, setTeacherName] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");

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

  const handleAdd = () => {};

  return (
    <form className="w-full flex flex-wrap sm:flex-col lg:flex-row items-center justify-start gap-4">
      <TextInput
        title={"اسم المعلم:"}
        value={teacherName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTeacherName(e.target.value)
        }
        placeholder="ادخل اسم المعلم"
      />
      <NumberInput
        title={"رقم الهاتف:"}
        value={teacherPhone}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTeacherPhone(e.target.value)
        }
        placeholder="ادخل رقم الهاتف"
      />
      <DropDown
        title={"المادة:"}
        value={selectedSubject}
        onChange={(e: { value: Obj }) => setSelectedSubject(e.value)}
        items={subjects}
        placeholder={"اختر المادة"}
      />
      <div className="sm:w-full lg:w-[25%] flex flex-col items-start justify-center gap-y-2">
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
      <div className="sm:w-full lg:w-[25%] flex flex-col items-start justify-center gap-y-1">
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
      <div className="w-full flex justify-end items-center">
        <ButtonAdd handleClick={handleAdd} />
      </div>
    </form>
  );
};

export default AddTeacherSection;
