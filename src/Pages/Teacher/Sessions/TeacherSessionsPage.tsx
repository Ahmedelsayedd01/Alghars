import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ScheduleSessions, Session } from "../../../types";
import { Link, useLocation } from "react-router-dom";

const TeacherSessionsPage = () => {
  const location = useLocation();
  const sessionDate = location.state;

  const scheduleTeacherStore = useSelector(
    (state: any) => state.sessionsTeacher.data
  );

  const [sessionsTeacher, setSessionsTeacher] = useState<Session[]>([]);
  const [sessionLast, setSessionLast] = useState<boolean>(false);

  useEffect(() => {
    const date = new Date();
    const toDay = date.getDate(); // Corrected: get the day of the month
    const month = date.getMonth() + 1; // Corrected: Add 1 to match the actual month
    const year = date.getFullYear();

    const myDate = `${toDay.valueOf() > 9 ? toDay : `0${toDay}`}/${
      month.valueOf() > 9 ? month : `0${month}`
    }/${year}`;

    const sessionDateParts = sessionDate.split("/");
    const myDateParts = myDate.split("/");

    const sessionDateNum = new Date(
      parseInt(sessionDateParts[2]),
      parseInt(sessionDateParts[1]) - 1,
      parseInt(sessionDateParts[0])
    ).getTime();

    const myDateNum = new Date(
      parseInt(myDateParts[2]),
      parseInt(myDateParts[1]) - 1,
      parseInt(myDateParts[0])
    ).getTime();

    if (myDateNum > sessionDateNum) {
      setSessionLast(true);
      console.log("yes");
    } else {
      setSessionLast(false);
      console.log("no");
    }

    // console.log('toDay',toDay)
    // console.log('month',month)
    // console.log('year',year)
    console.log("sessionDate", sessionDate);
    console.log("myDate", myDate);
  }, []);

  useEffect(() => {
    const selectedSessions =
      scheduleTeacherStore.find(
        (item: ScheduleSessions) => item.day === sessionDate
      )?.sessions || [];

    setSessionsTeacher(selectedSessions);
  }, [scheduleTeacherStore, sessionDate]);

  return (
    <>
      {sessionLast ? (
        <div className="h-[50vh]  flex items-center justify-center ">
          <p className="p-8 rounded-full bg-gray-200 shadow-lg text-3xl font-TextFontMedium text-thirdColor">
            لقد انتهت حصص هذا اليوم
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-wrap items-center justify-start gap-4">
          {sessionsTeacher.map((session: Session, index: number) => (
            <Link
              to={`session/${session.id}`}
              state={session.id}
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
