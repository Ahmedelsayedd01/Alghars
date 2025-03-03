import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  role?: string;
  isLogin?: boolean;
  children?: ReactNode;
}

const ProtectedRoute = ({ role, isLogin, children }: ProtectedRouteProps) => {
  const { userState: user } = useAuth();
  const roleUser = user?.role.toLowerCase();
  const roleProp = role ? role.toLowerCase() : "";
  const location = useLocation();
  const navigate = useNavigate();

  console.log("location", location);
  console.log("roleUser", roleUser);
  console.log("roleProp", roleProp);

  // Redirect to the last visited page or a default route if already logged in and trying to access /login
  useEffect(() => {
    if (isLogin && user) {
      return navigate(-1 as any, { replace: true });
    }
  }, [user, isLogin, navigate]);

  // If the user is not authenticated and this is not the login page, redirect to /login
  if (!user && !isLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is specified, check if the user has the correct role
  if (roleProp && roleUser !== roleProp) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If role specified and user has the correct role, render child routes
  if (roleProp === roleUser && roleProp === "admin") {
    <Navigate to="/dashboard/teachers" replace />;
    // return children ? <>{children}</> : <Outlet />;
  }
  
  // No redirect for teacher; just allow the component to render
  if (roleProp === roleUser && roleUser === "teacher") {
    <Navigate to="/schedule_sessions" replace />;
    // return children ? <>{children}</> : <Outlet />;
  }

  // If children are provided, render them
  if (children) {
    return <>{children}</>;
  }

  return <Outlet />; // Render child routes if authenticated and role matches
};

export default ProtectedRoute;
