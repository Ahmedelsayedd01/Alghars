import React, { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logOut, login } from "../Store/CreateSlices";
import { AuthContextType } from "../types";

// Create a context
const AuthContext = createContext<AuthContextType | null>(null);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hideSidebar, setHideSidebar] = useState(() => {
    const savedState = localStorage.getItem("stateSidebar");
    return savedState ? JSON.parse(savedState) : true;
  });

  const dispatch = useDispatch();
  const userStore = useSelector((state: any) => state.user.data);

  const [userState, setUserState] = useState(() => {
    const userData = userStore ? userStore : null;
    return userData;
  });

  useEffect(() => {
    if (userState) {
      dispatch(login(userState));
    } else {
      dispatch(logOut());
    }
  }, [userState, dispatch]);

  const loginUser = (userData: any) => {
    setUserState(userData);
    toast.success(`Welcome ${userData.username}`);
  };

  const logout = () => {
    setUserState(null);
    setHideSidebar(true);
    dispatch(logOut());
  };

  const hideSide = (isHidden: boolean) => {
    setHideSidebar(isHidden);
    localStorage.setItem("stateSidebar", JSON.stringify(isHidden));
  };

  return (
    <AuthContext.Provider
      value={{
        userState,
        loginUser,
        logout,
        toastSuccess: (text) => toast.success(text),
        toastError: (text) => toast.error(text),
        hideSide,
        hideSidebar,
      }}
    >
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within a ContextProvider");
  }
  return context;
};
