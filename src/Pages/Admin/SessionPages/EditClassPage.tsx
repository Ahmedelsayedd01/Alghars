import { useEffect, useState } from "react";
import {
  ButtonAdd,
  DateInput,
  DropDown,
  NumberInput,
  Switch,
} from "../../../Components/Components";
import { Obj } from "../../../types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

interface EditClassPageProps {
  nameTitle: (id: number | undefined) => void;
}

const EditClassPage = ({ nameTitle }: EditClassPageProps) => {
  const { classId } = useParams();

  const teachers = useSelector((state: any) => state.teachers.data);
  const students = useSelector((state: any) => state.students.data);
  const subjects =  useSelector((state: any) => state.subscriptions.data);

  const [selectedTeacher, setSelectedTeacher] = useState<Obj | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Obj | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Obj | null>(null);

  const [classDate, setClassDate] = useState("");
  const [classPrice, setClassPrice] = useState(0);
  const [classStatus, setClassStatus] = useState(0);

  useEffect(() => {
    console.log("classId", classId);
    nameTitle(classId ? parseInt(classId) : undefined);
  }, [classId]);

  useEffect(() => {
    console.log("selectedTeacher", selectedTeacher);
    console.log("selectedStudent", selectedStudent);
    console.log("selectedSubject", selectedSubject);
  }, [selectedTeacher, selectedStudent, selectedSubject]);

  const handleClassStatus = () => {
    const Active = classStatus;
    {
      Active === 0 ? setClassStatus(1) : setClassStatus(0);
    }
  };
  const handleEdit = () => {};

  return (
    <form>
      <div className="w-full flex flex-wrap sm:flex-col lg:flex-row items-center justify-start gap-4 sm:mb-8 lg:mb-0">
        {/* Teacher Name */}
        <DropDown
          title={"اسم المعلم:"}
          value={selectedTeacher}
          onChange={(e: { value: Obj }) => setSelectedTeacher(e.value)}
          items={teachers}
          placeholder={"اختر المعلم"}
        />

        {/* Student Name */}
        <DropDown
          title={"اسم الطالب:"}
          value={selectedStudent}
          onChange={(e: { value: Obj }) => setSelectedStudent(e.value)}
          items={students}
          placeholder={"اختر الطالب"}
        />

        {/*  Subject*/}
        <DropDown
          title={"المادة:"}
          value={selectedSubject}
          onChange={(e: { value: Obj }) => setSelectedSubject(e.value)}
          items={subjects}
          placeholder={"اختر المادة"}
        />

        {/* Date Class */}
        <DateInput
          title={"التاريخ:"}
          value={classDate}
          maxDate={false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setClassDate(e.target.value);
          }}
          placeholder={"ادخل التاريخ"}
        />

        {/* Price Class */}
        <NumberInput
          title={"السعر:"}
          value={classPrice.toString()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setClassPrice(Number(e.target.value))
          }
          placeholder="ادخل السعر "
        />

        <div className="sm:w-full lg:w-[26%] flex items-center justify-start gap-x-2 mt-7">
          <span className="text-2xl font-TextFontMedium text-thirdColor mt-2">
            الحالة:
          </span>
          {/* Class Status */}
          <Switch
            bgcolor={false}
            checked={classStatus === 1}
            handleClick={handleClassStatus}
          />
        </div>
      </div>
      {/* Button Add */}
      <div className="w-full flex justify-end items-center">
        <ButtonAdd
        text="تعديل"
        handleClick={handleEdit} />
      </div>
    </form>
  );
};

export default EditClassPage;
