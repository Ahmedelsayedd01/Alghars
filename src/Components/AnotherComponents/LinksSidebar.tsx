import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudent } from "react-icons/pi";
import { ImBook } from "react-icons/im";
import { FaRev } from "react-icons/fa";

const LinksSidebar = () => {
  const auth = useAuth();
  const hideSide = auth.hideSidebar;

  // State to hold computed values

  /* Teachers */
  const [isActiveTeachers, setIsActiveTeachers] = useState(true);
  const [isActiveTeachersIcon, setIsActiveTeachersIcon] = useState(true);
  /* Students */
  const [isActiveStudents, setIsActiveStudents] = useState(false);
  const [isActiveStudentsIcon, setIsActiveStudentsIcon] = useState(false);
  /* Subjects */
  const [isActiveSubjects, setIsActiveSubjects] = useState(false);
  const [isActiveSubjectsIcon, setIsActiveSubjectsIcon] = useState(false);
  /* Classes */
  const [isActiveClasses, setIsActiveClasses] = useState(false);
  const [isActiveClassesIcon, setIsActiveClassesIcon] = useState(false);

  // Handler functions to manage navigation state

  const handleStateLinks = () => {
    setIsActiveTeachers(false);
    setIsActiveTeachersIcon(false);
    setIsActiveStudents(false);
    setIsActiveStudentsIcon(false);
    setIsActiveSubjects(false);
    setIsActiveSubjectsIcon(false);
    setIsActiveClasses(false);
    setIsActiveClassesIcon(false);
  };
  /* Teachers */
  const handleClickTeachers = () => {
    handleStateLinks();
    setIsActiveTeachers(true);
    setIsActiveTeachersIcon(true);
  };
  /* Students */
  const handleClickStudents = () => {
    handleStateLinks();
    setIsActiveStudents(true);
    setIsActiveStudentsIcon(true);
  };
  /* Subjects */
  const handleClickSubjects = () => {
    handleStateLinks();
    setIsActiveSubjects(true);
    setIsActiveSubjectsIcon(true);
  };
  /* Classes */
  const handleClickClasses = () => {
    handleStateLinks();
    setIsActiveClasses(true);
    setIsActiveClassesIcon(true);
  };

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

        {/* Subjects */}
        <Link
          to="/dashboard/subjects"
          onClick={handleClickSubjects}
          className={`
                                   ${
                                     isActiveSubjects
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
            <ImBook 
              className={`${
                isActiveSubjectsIcon ? "text-white" : "text-white"
              } text-2xl group-hover:text-white transition-all ease-in-out duration-300`}
            />
            <span
              className={`${hideSide ? "block" : "hidden"} 
                                          ${
                                            isActiveSubjects
                                              ? "text-white"
                                              : "text-white"
                                          }
                                          text-xl font-TextFontMedium transition-all ease-in-out duration-300
                                          group-hover:text-white`}
            >
              المواد
            </span>
          </div>
        </Link>

        {/* Classes */}
        <Link
          to="/dashboard/classes"
          onClick={handleClickClasses}
          className={`
                                   ${
                                     isActiveClasses
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
                isActiveClassesIcon ? "text-white" : "text-white"
              } text-2xl group-hover:text-white transition-all ease-in-out duration-300`}
            />
            <span
              className={`${hideSide ? "block" : "hidden"} 
                                          ${
                                            isActiveClasses
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
