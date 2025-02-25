import { useEffect, useState } from "react";

import { useAuth } from "../../Context/Auth.jsx";
import Logo from "../../Assets/Images/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../Store/CreateSlices.tsx";
import { SubmitButton } from "../Components.ts";

const Navbar = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  const handleLogout = () => {
    auth.logout();
    dispatch(logOut());
    navigate("/login", { replace: true });
  };

  return (
    <>
      <nav className="flex items-center justify-between py-2 px-4 gap-x-4">
        <div className="sm:w-5/12 lg:w-6/12 xl:w-3/12 flex items-center justify-start sm:gap-x-4">
          <div className="relative z-10 w-14">
            {/* image profile */}
            {auth?.userState?.image ? (
              <img
                src={auth?.userState?.image}
                className="min-w-14 max-w-14 min-h-14  max-h-14 p-1 bg-white border-2 border-mainColor rounded-full object-cover object-center"
                alt="Profile"
              />
            ) : (
              <img
                src={Logo}
                className="min-w-14 max-w-14 min-h-14  max-h-14 p-1 bg-white border-2 border-mainColor rounded-full object-cover object-center"
                alt="Profile"
              />
            )}
            <span
              className={`absolute z-10 sm:left-0  ${
                isOnline ? "bg-green-400" : "bg-red-600"
              } rounded-full bottom-1 w-[18px] h-[18px] animate-pulse`}
            ></span>
          </div>
          {/* Name Admin */}
          <div className="sm:w-10/12">
            <span className="w-full text-2xl text-thirdColor font-TextFontSemiBold">
              مرحبا {auth?.userState?.username || ""}
            </span>
          </div>
        </div>
        <div className="">
          <SubmitButton
            type="button"
            bgColor="thirdColor"
            text={"تسجيل الخروج"}
            handleClick={handleLogout}
            withIcon={false}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
