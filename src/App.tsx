import "./index.css";
import { Outlet } from "react-router-dom";
import { useAuth } from "./Context/Auth";
import { Navbar, Sidebar } from "./Components/Components";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { useEffect, useMemo } from "react";

const App = () => {
  const { hideSidebar, userState: user } = useAuth();

  // Memoize hideSide for better performance
  const isSidebarVisible = useMemo(() => user.role === "admin", [user.role]);

  useEffect(() => {

    const userData=JSON.stringify(user);
    console.log(JSON.parse(userData));
  }, [user]);

  // Helper function for dynamic padding
  const getMainPadding = () => {
    if (user.role === "admin") {
      return hideSidebar ? "pr-60" : "pr-16";
    }
    return "";
  };

  return (
    <PrimeReactProvider>
      <div className="relative w-full flex h-screen overflow-hidden bg-secoundBgColor">
        {/* Sidebar */}
        {isSidebarVisible && (
          <aside
            className={`${
              hideSidebar ? "w-60" : "w-16"
            } fixed right-0 z-10 duration-300 overflow-hidden`}
            aria-label="Sidebar"
          >
            <Sidebar />
          </aside>
        )}

        {/* Main Content */}
        <main
          className={`${
            isSidebarVisible ? getMainPadding() : ""
          } w-full duration-300`}
        >
          {/* Navbar */}
          <header className="sticky top-0 left-0 z-10 bg-secoundBgColor drop-shadow-nav">
            <Navbar />
          </header>

          {/* Main Content Area */}
          <section className="relative w-full px-3 h-full overflow-y-scroll scrollPage">
            <Outlet />
          </section>
        </main>
      </div>
    </PrimeReactProvider>
  );
};

export default App;
