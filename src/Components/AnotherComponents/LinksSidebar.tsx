import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudent } from "react-icons/pi";

const LinksSidebar = () => {
  const auth = useAuth();
  const hideSide = auth.hideSidebar;

  // State to hold computed values
  /* Teachers */
  const [isActiveTeachers, setIsActiveTeachers] = useState(true);
  const [isActiveTeachersIcon, setIsActiveTeachersIcon] = useState(true);
  /* Teachers */
  const [isActiveStudents, setIsActiveStudents] = useState(false);
  const [isActiveStudentsIcon, setIsActiveStudentsIcon] = useState(false);

  // Handler functions to manage navigation state

  const handleStateLinks = () => {
    setIsActiveTeachers(false);
    setIsActiveTeachersIcon(false);
    setIsActiveStudents(false);
    setIsActiveStudentsIcon(false);
  };
  /* Teachers */
  const handleClickTeachers = () => {
    handleStateLinks();
    setIsActiveTeachers(true);
    setIsActiveTeachersIcon(true);
  };
  const handleClickStudents = () => {
    handleStateLinks();
    setIsActiveStudents(true);
    setIsActiveStudentsIcon(true);
  };

  return (
    <>
      <div className="LinksSidebar w-full flex flex-col items-center justify-start gap-y-3 mt-2">
        {/* Teachers */}
        <Link
          to="/"
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
              } text-3xl group-hover:text-white transition-all ease-in-out duration-300`}
            />
            <span
              className={`${hideSide ? "block" : "hidden"} 
                                          ${
                                            isActiveTeachers
                                              ? "text-white"
                                              : "text-white"
                                          }
                                          text-2xl font-TextFontMedium transition-all ease-in-out duration-300
                                          group-hover:text-white`}
            >
              المعلمين
            </span>
          </div>
        </Link>

        {/* Students */}
        <Link
          to="/"
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
              } text-3xl group-hover:text-white transition-all ease-in-out duration-300`}
            />
            <span
              className={`${hideSide ? "block" : "hidden"} 
                                          ${
                                            isActiveStudents
                                              ? "text-white"
                                              : "text-white"
                                          }
                                          text-2xl font-TextFontMedium transition-all ease-in-out duration-300
                                          group-hover:text-white`}
            >
              الطلاب
            </span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default LinksSidebar;
