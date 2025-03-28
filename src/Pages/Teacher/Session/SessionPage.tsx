import { Link, useLocation } from "react-router-dom";
import { ScheduleSessions, Session } from "../../../types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GoDotFill } from "react-icons/go";
import { useChangeState } from "../../../Hooks/useChangeState";
import { StaticLoader } from "../../../Components/Components";
import { useGet } from "../../../Hooks/useGet";

const SessionPage = () => {
  const location = useLocation();
  const sessionId = location.state as number;

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const {
    refetch: refetchScheduleTeacher,
    loading: loadingScheduleTeacher,
    data: dataScheduleTeacher,
  } = useGet<ScheduleSessions>(`${apiUrl}/teacher/session/current`);

  const { changeState, loadingChange } = useChangeState();

  const [sessionsSchedule, setSessionsSchedule] = useState<ScheduleSessions[]>(
    []
  );
  const [session, setSession] = useState<Session | null>(null);
  const [timeNow, setTimeNow] = useState<string>("");
  const [endSession, setEndSession] = useState<boolean>(false);

  const [sessionUnDone, setSessionUnDone] = useState<number | null>(null);
  const [checkSessionStatus, setCheckSessionStatus] = useState<boolean>(false);

  useEffect(() => {
    refetchScheduleTeacher();
  }, [refetchScheduleTeacher]);
  useEffect(() => {
    if (dataScheduleTeacher) {
      setSessionsSchedule(dataScheduleTeacher);
      console.log("setSessionsSchedule", sessionsSchedule);
    }
  }, [dataScheduleTeacher]);

  useEffect(() => {
    const selectedSession = sessionsSchedule
      .map((item: ScheduleSessions) => item.sessions)
      .flat()
      .find((session: Session) => session.Session_id === sessionId);

    setSession(selectedSession || null);
    console.log("selectedSession", selectedSession);
  }, [sessionsSchedule, sessionId]);

  useEffect(() => {
    const checkStatus = sessionsSchedule
      .map((item: ScheduleSessions) => item.sessions)
      .flat()
      .some((session: Session) => session.status === "processing");

    if (checkStatus === true) {
      setCheckSessionStatus(true);
    } else {
      setCheckSessionStatus(false);
    }

    const sessionUnDoneId = sessionsSchedule
      .map((item: ScheduleSessions) => item.sessions)
      .flat()
      .find((item: Session) => item.status === "processing");

    setSessionUnDone(sessionUnDoneId?.Session_id || null);

    console.log("sessionsSchedule", sessionsSchedule);
    console.log("sessionUnDone", sessionUnDone);
    console.log("checkStatus", checkStatus);
  }, [sessionsSchedule]);

  useEffect(() => {
    // console.log("timeNow", timeNow);
  }, [timeNow]);

  useEffect(() => {
    const updateCurrentTime = () => {
      const hours = new Date().getHours();
      const minutes = new Date().getMinutes();
      const seconds = new Date().getSeconds();

      const time = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      setTimeNow(time);
    };

    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 1000);

    if (session?.start && !session?.end) {
      const startTime = session.start;
      const timeNowNum = parseInt(timeNow.replace(":", ""));
      const startTimeNum = parseInt(startTime.replace(":", ""));

      console.log("timeNowNum", timeNowNum);
      console.log("startTimeNum", startTimeNum);
      console.log("timeNowNum - startTimeNum ", timeNowNum - startTimeNum);
      console.log("startTimeNum + 100", startTimeNum + 100);

      if (timeNowNum - startTimeNum >= 100) {
        console.log("you can end the session");
        setEndSession(true);
        clearInterval(intervalId);
        // handleEndSession(session?.Session_id)
      }
    }

    return () => clearInterval(intervalId);
  }, [timeNow]);

  const handleStartSession = async (sessionId: number | undefined) => {
    // Add your logic here
    const data = { sessionId };
    const response = await changeState({
      url: `${apiUrl}/teacher/session/start/${sessionId}`,
      message: `تم بدء الحصة`,
      data,
    });

    if (response) {
      refetchScheduleTeacher();
    }
    console.log(sessionId);
  };
  const handleEndSession = async (sessionId: number | undefined) => {
    // Add your logic here
    const data = { sessionId };
    const response = await changeState({
      url: `${apiUrl}/teacher/session/end/${sessionId}`,
      message: `تم انهاء الحصة`,
      data,
    });

    if (response) {
      refetchScheduleTeacher();
    }
    console.log(sessionId);
  };
  return (
    <>
      {loadingScheduleTeacher ? (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col items-center justify-start gap-3">
            <div className="w-full text-xl font-TextFontMedium text-secondColor flex sm:flex-col lg:flex-row items-start justify-start gap-x-10 gap-y-3">
              <p>
                اسم الطالب:{" "}
                <span className="text-gray-500">{session?.student.name}.</span>
              </p>
              <p>
                العنوان:{" "}
                <span className="text-gray-500">
                  {session?.student.address}.
                </span>
              </p>
            </div>
            <div className="w-full text-xl font-TextFontMedium text-secondColor flex sm:flex-col lg:flex-row items-start justify-start gap-x-10 gap-y-3">
              <p>
                وقت البدء:{" "}
                <span className="text-gray-500">
                  {session?.start || "لم تبدأ بعد"}.
                </span>
              </p>
              <p>
                وقت الانتهاء:{" "}
                <span className="text-gray-500">
                  {session?.end || "لم تنتهي بعد"}.
                </span>
              </p>
            </div>
          </div>
          {loadingChange ? (
            <div className="w-full h-[70vh] flex justify-center items-center">
              <StaticLoader />
            </div>
          ) : (
            <div className="w-full h-[52vh] flex items-center justify-center">
              <div className="p-8 rounded-full bg-gray-200 shadow-lg">
                {/* session is pending */}
                {session?.status === "pending" &&
                  session?.start === null &&
                  !checkSessionStatus && (
                    <motion.button
                      type="button"
                      className="w-60 h-60 flex items-center justify-center text-3xl font-TextFontMedium text-white bg-mainColor border-4 border-mainColor rounded-full cursor-pointer shadow-xl hover:bg-transparent hover:text-mainColor"
                      onClick={() => handleStartSession(session?.Session_id)}
                      animate={{ scale: [1, 1.2, 1] }} // Pulsating effect with opacity change
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      البدء
                    </motion.button>
                  )}
                {/* session is pending but the anoter session is processing */}
                {session?.status === "pending" &&
                  session?.start === null &&
                  checkSessionStatus && (
                    <p className="flex items-end gap-x-2 sm:text-xl lg:text-3xl font-TextFontMedium text-thirdColor">
                      لم تنتهي من الحصة التى بداتها{" "}
                      <Link
                        to={`/schedule_sessions/sessions/session/${sessionUnDone}`}
                        state={sessionUnDone}
                        className="font-TextFontBold text-secondColor border-b-2 border-secondColor hover:text-thirdColor hover:border-thirdColor duration-300 ease-in-out"
                      >
                        الحصة
                      </Link>
                    </p>
                  )}
                {/* session is processing */}
                {session?.status === "processing" && endSession === false && (
                  <p className="flex items-end gap-x-2 sm:text-xl lg:text-3xl font-TextFontMedium text-thirdColor">
                    لم تنتهي بعد وقت الحصة
                    <motion.span
                      className="text-xl flex"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <GoDotFill />
                      <GoDotFill />
                      <GoDotFill />
                    </motion.span>
                  </p>
                )}
                {/* session is done */}
                {session?.status === "processing" && endSession && (
                  <motion.button
                    type="button"
                    className="w-60 h-60 flex items-center justify-center text-3xl font-TextFontMedium text-white bg-red-400 border-4 border-red-400 rounded-full cursor-pointer shadow-xl hover:bg-transparent hover:text-red-400"
                    onClick={() => handleEndSession(session?.Session_id)}
                    animate={{ scale: [1, 1.2, 1] }} // Pulsating effect with opacity change
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    الانتهاء
                  </motion.button>
                )}
                {/* session is done */}
                {session?.status === "done" && session?.end !== "" && (
                  <p className="flex items-end gap-x-2 text-3xl font-TextFontMedium text-thirdColor">
                    تم الانتهاء من الحصة.
                  </p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SessionPage;
