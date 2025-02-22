import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProtectedLogin from "./ProtectedAuth/ProtectedLogin";
import { LoginPage } from "./Pages/Pages";

export const router = createBrowserRouter(
  [
    /* Login */
    {
      path: "/login",
      element: <ProtectedLogin />,
      children: [{ path: "", element: <LoginPage /> }],
    },
    {
      path: "/",
      element: <App />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
