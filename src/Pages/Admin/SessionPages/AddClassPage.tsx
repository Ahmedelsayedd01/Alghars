import { useEffect, useState } from "react";
import {
  ButtonAdd,
  DateInput,
  DropDown,
  // NumberInput,
  Switch,
} from "../../../Components/Components";
import { Obj, Subscriptions } from "../../../types";
import { useSelector } from "react-redux";
import { usePost } from "../../../Hooks/usePost";
import { useAuth } from "../../../Context/Auth";

const AddClassPage = () => {
    const auth = useAuth();
  const teachers = useSelector((state: any) => state.teachers.data);
  const students = useSelector((state: any) => state.students.data);
  const subscriptionsStore = useSelector((state: any) => state.subscriptions.data);

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
  
    const { postData, loadingPost, response } = usePost({
      url: `${apiUrl}/admin/session/create`,
    });

  const [selectedTeacher, setSelectedTeacher] = useState<Obj | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Obj | null>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<Obj | null>(null);

  const [subscriptions, setSubscriptions] = useState<Subscriptions[]>([]);
  const [classDate, setClassDate] = useState("");
  // const [classPrice, setClassPrice] = useState(0);
  const [classStatus, setClassStatus] = useState(0);

    useEffect(() => {
      setSubscriptions(subscriptionsStore);
    }, [subscriptionsStore]);

  useEffect(() => {
    console.log("selectedTeacher", selectedTeacher);
    console.log("selectedStudent", selectedStudent);
    console.log("selectedSubscription", selectedSubscription);
  }, [selectedTeacher, selectedStudent, selectedSubscription]);

  const handleClassStatus = () => {
    const Active = classStatus;
    {
      Active === 0 ? setClassStatus(1) : setClassStatus(0);
    }
  };

  const handleReset = () => {
    setSelectedTeacher(null);
    setSelectedStudent(null);
    setSelectedSubscription(null);
    setClassDate('');
    setClassStatus(0);
  };

  useEffect(() => {
    if (response && response.status === 200) {
      handleReset();
    }
    console.log("response", response);
  }, [response]);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!studentName) {
    //   auth.toastError("اضف اسم الطالب");
    //   return;
    // }

    const payload = {
      teacher: selectedTeacher ? selectedTeacher.id.toString() : "",
      student: selectedStudent ? selectedStudent.id.toString() : "",
      subscription: selectedSubscription ? selectedSubscription.id.toString() : "",
      date: classDate,
      status: classStatus === 1 ? "active" : "inactive",
    };

    postData(payload, "تم اضافة الحصة بنجاح");
  };
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

        {/*  subscription */}
        <DropDown
          title={"الاشتراك:"}
          value={selectedSubscription}
          onChange={(e: { value: Obj }) => setSelectedSubscription(e.value)}
          items={subscriptions}
          placeholder={"اختر الاشتراك"}
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
        {/* <NumberInput
          title={"السعر:"}
          value={classPrice.toString()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setClassPrice(Number(e.target.value))
          }
          placeholder="ادخل السعر "
        /> */}

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
        <ButtonAdd handleClick={()=>handleAdd} />
      </div>
    </form>
  );
};

export default AddClassPage;
