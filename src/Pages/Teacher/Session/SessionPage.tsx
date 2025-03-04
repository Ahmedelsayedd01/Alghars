import { useLocation } from "react-router-dom";
import { ScheduleSessions, Session } from "../../../types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { GoDotFill } from "react-icons/go";

const SessionPage = () => {
  const location = useLocation();
  const sessionId = location.state as number;

  const scheduleTeacherStore = useSelector(
    (state: { sessionsTeacher: { data: ScheduleSessions[] } }) =>
      state.sessionsTeacher.data
  );

  const [session, setSession] = useState<Session | null>(null);
  const [timeNow, setTimeNow] = useState<string>("");
  const [endSession, setEndSession] = useState<boolean>(false);

  useEffect(() => {
    console.log("timeNow", timeNow);
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

    if (session?.start) {
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
      }
    }

    return () => clearInterval(intervalId);
  }, [timeNow]);

  useEffect(() => {
    const selectedSession = scheduleTeacherStore
      .map((item: ScheduleSessions) => item.sessions)
      .flat()
      .find((session: Session) => session.id === sessionId);

    setSession(selectedSession || null);
    console.log("selectedSession", selectedSession);
  }, [scheduleTeacherStore, sessionId]);

  const handleStartSession = (sessionId: number | undefined) => {
    // Add your logic here
  };
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-3">
        <div className="w-full text-xl font-TextFontMedium text-secondColor flex sm:flex-col lg:flex-row items-start justify-start gap-x-10 gap-y-3">
          <p>
            اسم الطالب:{" "}
            <span className="text-gray-500">{session?.student.name}.</span>
          </p>
          <p>
            العنوان:{" "}
            <span className="text-gray-500">{session?.student.address}.</span>
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
        {/* teacher/session/start/${session?.id} */}
      </div>
      <div className="w-full h-[52vh] flex items-center justify-center">
        <div className="p-8 rounded-full bg-gray-200 shadow-lg">
          {session?.status === "pending" && (
            <motion.button
              type="button"
              className="w-60 h-60 flex items-center justify-center text-3xl font-TextFontMedium text-white bg-mainColor border-4 border-mainColor rounded-full cursor-pointer shadow-xl hover:bg-transparent hover:text-mainColor"
              onClick={() => handleStartSession(session?.id)}
              animate={{ scale: [1, 1.2, 1] }} // Pulsating effect with opacity change
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              البدء
            </motion.button>
          )}
          {session?.status === "processing" && endSession === false && (
            <p className="flex items-end gap-x-2 text-3xl font-TextFontMedium text-thirdColor">
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
          {session?.status === "done" ||
            (endSession === true && (
              <motion.button
                type="button"
                className="w-60 h-60 flex items-center justify-center text-3xl font-TextFontMedium text-white bg-red-400 border-4 border-red-400 rounded-full cursor-pointer shadow-xl hover:bg-transparent hover:text-red-400"
                onClick={() => handleStartSession(session?.id)}
                animate={{ scale: [1, 1.2, 1] }} // Pulsating effect with opacity change
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                الانتهاء
              </motion.button>
            ))}
          {session?.status === "done" && (
            <p className="flex items-end gap-x-2 text-3xl font-TextFontMedium text-thirdColor">
              تم انهاء الحصة.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default SessionPage;
