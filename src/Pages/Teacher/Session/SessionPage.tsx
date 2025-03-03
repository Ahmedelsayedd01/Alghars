import { useLocation } from "react-router-dom";
import { ScheduleSessions, Session } from "../../../types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SessionPage = () => {
  const location = useLocation();
  const sessionId = location.state as number;

  const scheduleTeacherStore = useSelector(
    (state: { sessionsTeacher: { data: ScheduleSessions[] } }) =>
      state.sessionsTeacher.data
  );

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const selectedSession = scheduleTeacherStore
      .find((item: ScheduleSessions) => item.id === sessionId)
      ?.sessions?.find((session: Session) => session.id === sessionId);

    setSession(selectedSession || null);

    console.log("selectedSession", selectedSession);
  }, [scheduleTeacherStore, sessionId]);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-start">
        <div className="w-full text-xl font-TextFontMedium text-secondColor flex items-center justify-start gap-10">
        <p>اسم الطالب: <span className="text-gray-600">{session?.name}.</span></p>
        <p>العنوان: <span className="text-gray-600">{session?.location}.</span></p>
        </div>
        <div className="w-full text-xl font-TextFontMedium text-mainColor flex items-center justify-start gap-10">
        <span>وقت البدء: {session?.start || "لم تبدأ بعد"}.</span>
        <span>وقت الانتهاء: {session?.end || "لم تنتهي بعد"}.</span>
        </div>
      </div>
    </>
  );
};

export default SessionPage;
