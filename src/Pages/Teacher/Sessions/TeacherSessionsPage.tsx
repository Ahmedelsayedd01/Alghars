import { useEffect, useState } from "react";
import { ScheduleSessions, Session } from "../../../types";
import { Link, useLocation } from "react-router-dom";
import { useGet } from "../../../Hooks/useGet";
import { StaticLoader } from "../../../Components/Components";

const TeacherSessionsPage = () => {
  const location = useLocation();
  const sessionDate = location.state;

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const {
    refetch: refetchScheduleTeacher,
    loading: loadingScheduleTeacher,
    data: dataScheduleTeacher,
  } = useGet<ScheduleSessions>(`${apiUrl}/teacher/session/current`);


  const [sessionsSchedule, setSessionsSchedule] = useState<ScheduleSessions[]>(
    []
  );
  const [sessionsTeacher, setSessionsTeacher] = useState<Session[]>([]);
  const [sessionLast, setSessionLast] = useState<boolean>(false);

  useEffect(() => {
    refetchScheduleTeacher();
  }, [refetchScheduleTeacher]);
  
  useEffect(() => {
    if (dataScheduleTeacher) {
      setSessionsSchedule(dataScheduleTeacher);
    }
  }, [dataScheduleTeacher]);

  useEffect(() => {
    if (!sessionDate) return; // Prevent errors if sessionDate is undefined
  
    const date = new Date();
    const toDay = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
  
    const myDate = `${toDay}/${month}/${year}`;
  
    // Convert sessionDate to DD/MM/YYYY format if it's in YYYY-MM-DD
    let formattedSessionDate = sessionDate;
    if (sessionDate.includes("-")) {
      const [y, m, d] = sessionDate.split("-");
      formattedSessionDate = `${d}/${m}/${y}`;
    }
  
    // Parse date strings into Date objects
    const sessionDateNum = new Date(
      formattedSessionDate.split("/").reverse().join("-")
    ).getTime();
  
    const myDateNum = new Date(myDate.split("/").reverse().join("-")).getTime();
  
    if (myDateNum > sessionDateNum) {
      setSessionLast(true);
      console.log("yes");
    } else {
      setSessionLast(false);
      console.log("no");
    }
  
    console.log("sessionDate", formattedSessionDate);
    console.log("myDate", myDate);
  }, [sessionsSchedule, sessionDate]);
  

  useEffect(() => {
    const selectedSessions =
      sessionsSchedule.find(
        (item: ScheduleSessions) => item.date === sessionDate
      )?.sessions || [];

    setSessionsTeacher(selectedSessions);
  }, [sessionsSchedule, sessionDate]);

  return (
    <>
      {loadingScheduleTeacher ? (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : sessionsTeacher.length === 0 ? (
        <div className="h-[50vh]  flex items-center justify-center ">
          <p className="p-8 rounded-full bg-gray-200 shadow-lg text-3xl font-TextFontMedium text-thirdColor">
            لا يوجد حصص فى هذا اليوم
          </p>
        </div>
      ) : sessionLast ? (
        <div className="h-[50vh]  flex items-center justify-center ">
          <p className="p-8 rounded-full bg-gray-200 shadow-lg text-3xl font-TextFontMedium text-thirdColor">
            لقد انتهت حصص هذا اليوم
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-wrap items-center justify-start gap-4">
          {sessionsTeacher.map((session: Session, index: number) => (
            <Link
              to={`session/${session.Session_id}`}
              state={session.Session_id}
              key={index}
              className="sm:w-full lg:w-auto flex items-center justify-start p-4 bg-thirdColor text-white text-3xl 
            hover:bg-transparent hover:text-thirdColor border-2 border-thirdColor
            tranition duration-300 ease-in-out
            font-medium rounded-xl hover:shadow-md hover:-translate-y-2  active:scale-95"
            >
              {index + 1}- {session.student.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default TeacherSessionsPage;
