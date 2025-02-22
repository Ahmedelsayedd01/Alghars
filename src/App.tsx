import "./index.css";
import { Outlet } from "react-router-dom";
import { useAuth } from "./Context/Auth";
import { Navbar, Sidebar } from "./Components/Components";

const App = () => {
  const auth = useAuth();
  const hideSide = auth.hideSidebar;

  return (
    <>
      <div className="relative w-full flex h-screen overflow-hidden bg-secoundBgColor">
        {/* Sidebar */}
        <div
          className={`${
            hideSide ? "w-60" : "w-16"
          } fixed right-0 z-10 duration-300 overflow-hidden`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className={`${hideSide ? "pr-60" : "pr-16"} w-full duration-300`}>
          {/* Navbar */}
          <div className="sticky top-0 left-0 z-10 bg-secoundBgColor drop-shadow-nav">
            <Navbar />
          </div> 

          {/* Main Content Area */}
          <div className="relative w-full px-3 h-full overflow-y-scroll scrollPage">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
