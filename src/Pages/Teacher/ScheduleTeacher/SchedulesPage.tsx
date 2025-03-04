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
      <div className="w-full flex flex-wrap items-center justify-start gap-4">
        {scheduleTeacher.map((item: ScheduleSessions, index: number) => (
          <Link
            to={`sessions`}
            state={item.day}
            key={index}
            className="sm:w-[10%] flex items-center justify-center py-4 bg-thirdColor text-white text-3xl 
            hover:bg-transparent hover:text-thirdColor border-2 border-thirdColor
            tranition duration-300 ease-in-out
            font-medium rounded-xl hover:shadow-md hover:-translate-y-2 active:scale-95"
          >
            {index + 1}
          </Link>
        ))}
      </div>
    </>
  );
};

export default schedulesPage;
