import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudent } from "react-icons/pi";
import { BiSolidBackpack } from "react-icons/bi";
import { FaRev } from "react-icons/fa";

const LinksSidebar = () => {
  const auth = useAuth();
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const hideSide = auth.hideSidebar;

  // State to hold computed values

  /* Teachers */
  const [isActiveTeachers, setIsActiveTeachers] = useState(true);
  const [isActiveTeachersIcon, setIsActiveTeachersIcon] = useState(true);
  /* Students */
  const [isActiveStudents, setIsActiveStudents] = useState(false);
  const [isActiveStudentsIcon, setIsActiveStudentsIcon] = useState(false);
  /* Subscriptions */
  const [isActiveSubscriptions, setIsActiveSubscriptions] = useState(false);
  const [isActiveSubscriptionsIcon, setIsActiveSubscriptionsIcon] = useState(false);
  /* Sessions */
  const [isActiveSessions, setIsActiveSessions] = useState(false);
  const [isActiveSessionsIcon, setIsActiveSessionsIcon] = useState(false);

  // Handler functions to manage navigation state

  const handleStateLinks = () => {
    setIsActiveTeachers(false);
    setIsActiveTeachersIcon(false);
    setIsActiveStudents(false);
    setIsActiveStudentsIcon(false);
    setIsActiveSubscriptions(false);
    setIsActiveSubscriptionsIcon(false);
    setIsActiveSessions(false);
    setIsActiveSessionsIcon(false);
  };
  /* Teachers */
  const handleClickTeachers = () => {
    handleStateLinks();
    setIsActiveTeachers(true);
    setIsActiveTeachersIcon(true);
  };
  useEffect(() => {
    if (path === "/") {
      handleClickTeachers();
      navigate("/dashboard/teachers", { replace: true });
    }
  }, [path]);
  /* Students */
  const handleClickStudents = () => {
    handleStateLinks();
    setIsActiveStudents(true);
    setIsActiveStudentsIcon(true);
  };
  useEffect(() => {
    if (path === "/dashboard/students") {
      handleClickStudents();
      // navigate("/dashboard/teachers", { replace: true });
    }
  }, [path]);
  /* Subscriptions */
  const handleClickSubscriptions = () => {
    handleStateLinks();
    setIsActiveSubscriptions(true);
    setIsActiveSubscriptionsIcon(true);
  };
  useEffect(() => {
    if (path === "/dashboard/subscriptions") {
      handleClickSubscriptions();
      // navigate("/dashboard/subscriptions", { replace: true });
    }
  }, [path]);
  /* Sessions */
  const handleClickSessions = () => {
    handleStateLinks();
    setIsActiveSessions(true);
    setIsActiveSessionsIcon(true);
  };
  useEffect(() => {
    if (path === "/dashboard/sessions") {
      handleClickSessions();
      // navigate("/dashboard/sessions", { replace: true });
    }
  }, [path]);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-y-2 mt-2">
        {/* Teachers */}
        <Link
          to="/dashboard/teachers"
          onClick={handleClickTeachers}
          className={`
                                   ${
                                     isActiveTeachers
                                       ? "bg-[#4EE8E8] text-white drop-shadow-sm"
                                       : "bg-transparent text-red-600"
                                   }
                                   ${
                                     hideSide
                                       ? "justify-start"
                                       : "justify-center"
                                   } 
                                   rounded-xl px-2 py-2 hover:bg-[#4EE8E8] 
                                   hover:text-white w-full flex items-center  
                                    group`}
        >
          <div className="flex items-center gap-x-2">
            <LiaChalkboardTeacherSolid
              className={`${
                isActiveTeachersIcon ? "text-white" : "text-white"
              } text-2xl group-hover:text-white transition-all ease-in-out duration-300`}
            />
            <span
              className={`${hideSide ? "block" : "hidden"} 
                                          ${
                                            isActiveTeachers
                                              ? "text-white"
                                              : "text-white"
                                          }
                                          text-xl font-TextFontMedium transition-all ease-in-out duration-300
                                          group-hover:text-white`}
            >
              المعلمين
            </span>
          </div>
        </Link>

        {/* Students */}
        <Link
          to="/dashboard/students"
          onClick={handleClickStudents}
          className={`
                                   ${
                                     isActiveStudents
                                       ? "bg-[#4EE8E8] text-white"
                                       : "bg-transparent text-red-600"
                                   }
                                   ${
                                     hideSide
                                       ? "justify-start"
                                       : "justify-center"
                                   } 
                                   rounded-xl px-2 py-2 hover:bg-[#4EE8E8] 
                                   hover:text-white w-full flex items-center  
                                    group`}
        >
          <div className="flex items-center gap-x-2">
            <PiStudent
              className={`${
                isActiveStudentsIcon ? "text-white" : "text-white"
              } text-2xl group-hover:text-white transition-all ease-in-out duration-300`}
            />
            <span
              className={`${hideSide ? "block" : "hidden"} 
                                          ${
                                            isActiveStudents
                                              ? "text-white"
                                              : "text-white"
                                          }
                                          text-xl font-TextFontMedium transition-all ease-in-out duration-300
                                          group-hover:text-white`}
            >
              الطلاب
            </span>
          </div>
        </Link>

        {/* Subscriptions */}
        <Link
          to="/dashboard/subscriptions"
          onClick={handleClickSubscriptions}
          className={`
                                   ${
                                     isActiveSubscriptions
                                       ? "bg-[#4EE8E8] text-white"
                                       : "bg-transparent text-red-600"
                                   }
                                   ${
                                     hideSide
                                       ? "justify-start"
                                       : "justify-center"
                                   } 
                                   rounded-xl px-2 py-2 hover:bg-[#4EE8E8] 
                                   hover:text-white w-full flex items-center  
                                    group`}
        >
          <div className="flex items-center gap-x-2">
            <BiSolidBackpack 
              className={`${
                isActiveSubscriptionsIcon ? "text-white" : "text-white"
              } text-2xl group-hover:text-white transition-all ease-in-out duration-300`}
            />
            <span
              className={`${hideSide ? "block" : "hidden"} 
                                          ${
                                            isActiveSubscriptions
                                              ? "text-white"
                                              : "text-white"
                                          }
                                          text-xl font-TextFontMedium transition-all ease-in-out duration-300
                                          group-hover:text-white`}
            >
              الاشتراكات
            </span>
          </div>
        </Link>

        {/* Sessions */}
        <Link
          to="/dashboard/sessions"
          onClick={handleClickSessions}
          className={`
                                   ${
                                     isActiveSessions
                                       ? "bg-[#4EE8E8] text-white"
                                       : "bg-transparent text-red-600"
                                   }
                                   ${
                                     hideSide
                                       ? "justify-start"
                                       : "justify-center"
                                   } 
                                   rounded-xl px-2 py-2 hover:bg-[#4EE8E8] 
                                   hover:text-white w-full flex items-center  
                                    group`}
        >
          <div className="flex items-center gap-x-2">
            <FaRev
              className={`${
                isActiveSessionsIcon ? "text-white" : "text-white"
              } text-2xl group-hover:text-white transition-all ease-in-out duration-300`}
            />
            <span
              className={`${hideSide ? "block" : "hidden"} 
                                          ${
                                            isActiveSessions
                                              ? "text-white"
                                              : "text-white"
                                          }
                                          text-xl font-TextFontMedium transition-all ease-in-out duration-300
                                          group-hover:text-white`}
            >
              الحصص
            </span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default LinksSidebar;
