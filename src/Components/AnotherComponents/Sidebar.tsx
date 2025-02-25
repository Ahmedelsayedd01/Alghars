import { useEffect, useState } from "react";
import { LinksSidebar } from "../Components";
// import Logo from "../../Assets/Images/logo.png";
import { useAuth } from "../../Context/Auth";

const Sidebar = () => {
  const auth = useAuth();
  const hideSide = auth.hideSidebar;

  const [stateSide, setStateSide] = useState(() => {
    // Retrieve initial sidebar state from context or localStorage
    const savedState = auth.hideSidebar ?? localStorage.getItem("stateSidebar");
    return savedState ?? JSON.parse(savedState);
  });

  const handleSidebar = () => {
    setStateSide((prevState: boolean) => {
      const newState = !prevState;
      localStorage.setItem("stateSidebar", JSON.stringify(newState));
      auth.hideSide(newState); // Update the context as well
      return newState;
    });
  };

  useEffect(() => {
    // Keep the context state in sync with the local component state
    auth.hideSide(stateSide);
  }, [stateSide]);

  return (
    <aside className=" bg-thirdColor pb-3 px-3 rounded-tl-[38px] rounded-bl-[38px]  overflow-hidden h-screen duration-300">
      {/* <aside className=""> */}
      <div
        className="w-full flex items-center justify-center cursor-pointer"
        onClick={handleSidebar}
      >
        {/* <img
          src={Logo}
          className={`${
            hideSide ? "w-24 h-28 p-3" : "w-10 h-12 p-2"
          } bg-white rounded-2xl drop-shadow-sm `}
          alt="logo"
        /> */}
        <span
          className={`${
            hideSide ? "text-5xl py-3" : "text-sm pt-6 pb-2"
          } w-full text-center font-TextFontSemiBold text-white drop-shadow-lg`}
        >
          الغرس
        </span>
      </div>
      {/* <div className="w-full h-[40rem] overflow-scroll scrollSidebar scroll-smooth mt-2"> */}
      <div className="w-full h-[40rem] mt-2 border-t-2 border-gray-200">
        <LinksSidebar />
      </div>
      {/* </aside> */}
    </aside>
  );
};

export default Sidebar;
