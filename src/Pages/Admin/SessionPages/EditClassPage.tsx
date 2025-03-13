import { useEffect, useState } from "react";
import {
  ButtonAdd,
  DateInput,
  DropDown,
  StaticLoader,
  Switch,
} from "../../../Components/Components";
import { Obj, Students, Subscriptions, Teachers } from "../../../types";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGet } from "../../../Hooks/useGet";
import { usePost } from "../../../Hooks/usePost";
import { useAuth } from "../../../Context/Auth";

interface EditClassPageProps {
  nameTitle: (name: string) => void;
}

const EditClassPage = ({ nameTitle }: EditClassPageProps) => {
  const { classId } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();

  const sessionsStore = useSelector((state: any) => state.sessions.data);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  /* Get students */
  const {
    refetch: refetchStudents,
    loading: loadingStudents,
    data: dataStudents,
  } = useGet<Students>(`${apiUrl}/admin/student/show`);

  /* Get Teachers */
  const {
    refetch: refetchTeachers,
    loading: loadingTeachers,
    data: dataTeachers,
  } = useGet<Teachers>(`${apiUrl}/admin/teacher/show`);

  /* Get Subscriptions */
  const {
    refetch: refetchSubscriptions,
    loading: loadingSubscriptions,
    data: dataSubscriptions,
  } = useGet<Subscriptions>(`${apiUrl}/admin/package/show`);

  const { postData, loadingPost, response } = usePost({
    url: `${apiUrl}/admin/session/update/${classId}`,
  });

  const [teachers, setTeachers] = useState<Teachers[]>([]);
  const [students, setStudents] = useState<Students[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscriptions[]>([]);

  const [selectedTeacher, setSelectedTeacher] = useState<Obj | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Obj | null>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<Obj | null>(
    null
  );

  const [classDate, setClassDate] = useState("");
  const [classStatus, setClassStatus] = useState(0);

  useEffect(() => {
    refetchStudents();
    refetchTeachers();
    refetchSubscriptions();
  }, [refetchStudents, refetchTeachers, refetchSubscriptions]);

  useEffect(() => {
    if (dataTeachers) {
      setTeachers(dataTeachers);
    }
    if (dataStudents) {
      setStudents(dataStudents);
    }
    if (dataSubscriptions) {
      setSubscriptions(dataSubscriptions);
    }

    if (classId) {
      const session = sessionsStore.find(
        (t: Subscriptions) => t.id === parseInt(classId)
      );

      if (session) {
        nameTitle(session.date);
        setSelectedTeacher(
          teachers.find((t: Teachers) => t.id === session.teacher.id) || null
        );
        setSelectedStudent(
          students.find((t: Students) => t.id === session.student.id) || null
        );
        setClassStatus(session.active === "active" ? 1 : 0);
        setClassDate(session.date);
      }
      console.log("session.teas111111111111111", teachers);
      console.log("session", session);
    }

  }, [classId,dataTeachers, dataStudents, dataSubscriptions]);

  useEffect(() => {
    console.log("selectedTeacher", selectedTeacher);
    console.log("selectedStudent", selectedStudent);
    console.log("selectedSubscription", selectedSubscription);
  }, [selectedTeacher, selectedStudent, selectedSubscription]);



  // const handleClassStatus = () => {
  //   const Active = classStatus;
  //   {
  //     Active === 0 ? setClassStatus(1) : setClassStatus(0);
  //   }
  // };
  const handleClassStatus = () => {
    const Active = classStatus;
    {
      setClassStatus(Active === 0 ? 1 : 0);
    }
  };

  useEffect(() => {
    if (response && response.data.status === 'success') {
      navigate(-1 as any, { replace: true });
    }
    console.log("response", response);
  }, [response]);

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedTeacher) {
      auth.toastError("اختر اسم المعلم");
      return;
    }
    if (!selectedStudent) {
      auth.toastError("اختر اسم الطالب");
      return;
    }
    if (!classDate) {
      auth.toastError("اختر تاريخ الحصة");
      return;
    }

    const formData = new FormData();

    formData.append(
      "student_id",
      selectedStudent ? selectedStudent.id.toString() : ""
    );
    formData.append(
      "teacher_id",
      selectedTeacher ? selectedTeacher.id.toString() : ""
    );
    formData.append("date", classDate);
    formData.append(
      "package_id",
      selectedSubscription ? selectedSubscription.id.toString() : ""
    );
    formData.append("active", classStatus === 1 ? "active" : "inactive");

    postData(formData, "تم تعديل الحصة بنجاح");
  };
  return (
    <>
      {loadingStudents ||
      loadingTeachers ||
      loadingSubscriptions ||
      loadingPost ? (
        <div className="w-full h-92 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <form onSubmit={handleEdit}>
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
              required={false}
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
            <ButtonAdd text="تعديل" handleClick={() => handleEdit} />
          </div>
        </form>
      )}
    </>
  );
};

export default EditClassPage;
