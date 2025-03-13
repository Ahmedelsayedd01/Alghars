import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScheduleSessions } from "../../../types";
import { Link } from "react-router-dom";
import { useGet } from "../../../Hooks/useGet";
import { StaticLoader } from "../../../Components/Components";
import { setSessionsTeacher } from "../../../Store/CreateSlices";

const schedulesPage = () => {
  const scheduleTeacherStore = useSelector(
    (state: any) => state.sessionsTeacher.data
  );

  const dispatch = useDispatch();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const {
    refetch: refetchScheduleTeacher,
    loading: loadingScheduleTeacher,
    data: dataScheduleTeacher,
  } = useGet<ScheduleSessions>(`${apiUrl}/teacher/session/current`);

  const [scheduleTeacher, setScheduleTeacher] = useState<ScheduleSessions[]>(
    []
  );
  useEffect(() => {
    refetchScheduleTeacher();
  }, [refetchScheduleTeacher]);

  useEffect(() => {
    if (dataScheduleTeacher) {
      dispatch(setSessionsTeacher(dataScheduleTeacher));
      setScheduleTeacher(dataScheduleTeacher);
    }
    console.log('scheduleTeacherStore',scheduleTeacherStore)
    console.log('dataScheduleTeacher',dataScheduleTeacher)
  }, [dataScheduleTeacher]);
  return (
    <>
      {loadingScheduleTeacher ? (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <div className="w-full flex flex-wrap items-center justify-start gap-4">
          {scheduleTeacher.map((item: ScheduleSessions, index: number) => (
            <Link
              to={`sessions`}
              state={item.date}
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
      )}
    </>
  );
};

export default schedulesPage;
