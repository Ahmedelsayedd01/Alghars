import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ScheduleSessions } from "../../../types";
import { Link } from "react-router-dom";

const schedulesPage = () => {
  const scheduleTeacherStore = useSelector(
    (state: any) => state.sessionsTeacher.data
  );

  const [scheduleTeacher, setScheduleTeacher] = useState<ScheduleSessions[]>(
    []
  );
  useEffect(() => {
    setScheduleTeacher(scheduleTeacherStore);
    console.log(scheduleTeacherStore);
  }, [scheduleTeacherStore]);
  return (
    <>
      <div className="w-full flex flex-wrap gap-2">
        {scheduleTeacher.map((item: ScheduleSessions, index: number) => (
          <Link
            to={`/session/${item.id}`}
            key={index}
            className="flex items-center justify-center p-3 bg-white rounded-lg shadow-md"
          >
            <h1 className="text-lg font-semibold">{index + 1}</h1>
          </Link>
        ))}
      </div>
    </>
  );
};

export default schedulesPage;
