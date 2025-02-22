import { Outlet } from "react-router-dom";

const ProtectedLogin = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedLogin;
