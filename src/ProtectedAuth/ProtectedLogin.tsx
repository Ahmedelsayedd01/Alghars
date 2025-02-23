import { ReactNode } from "react";

interface ProtectedLoginProps {
  children: ReactNode;
}

const ProtectedLogin = ({ children }: ProtectedLoginProps) => {
  // component logic
  return <>{children}</>;
};

export default ProtectedLogin;