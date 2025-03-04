import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ScheduleSessions, Session } from "../../../types";
import { Link, useLocation } from "react-router-dom";

const TeacherSessionsPage = () => {
  const location = useLocation();
  const day = location.state;

  const scheduleTeacherStore = useSelector(
    (state: any) => state.sessionsTeacher.data
  );

  const [sessionsTeacher, setSessionsTeacher] = useState<Session[]>([]);

  useEffect(() => {
    const selectedSessions =
      scheduleTeacherStore.find((item: ScheduleSessions) => item.day === day)
        ?.sessions || [];

    setSessionsTeacher(selectedSessions);
  }, [scheduleTeacherStore, day]);

  return (
    <>
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
    </>
  );
};

export default TeacherSessionsPage;
