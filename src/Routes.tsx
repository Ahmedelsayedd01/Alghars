import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProtectedLogin from "./ProtectedAuth/ProtectedLogin";
import { LoginPage } from "./Pages/Pages";
import ProtectedRoute from "./ProtectedAuth/ProtectedRoute";
import {
  AddTeacherLayout,
  ClassesLayout,
  StudentsLayout,
  SubjectsLayout,
  TeachersLayout,
} from "./Layouts/Layouts";

export const router = createBrowserRouter(
  [
    /* Login */
    {
      path: "/login",
      element: (
        <ProtectedLogin>
          <LoginPage />
        </ProtectedLogin>
      ),
      children: [{ path: "", element: <LoginPage /> }],
    },
    {
      path: "/",
      element: (
        <>
          <ProtectedLogin>
            <App />
          </ProtectedLogin>
        </>
      ),
      children: [
        /* Admin */
        {
          path: "/dashboard",
          // element: <ProtectedRoute />,
          children: [
            {
              path: "teachers",
              children: [
                {
                  path: "",
                  element: <TeachersLayout />,
                },
                {
                  path: "add",
                  element: <AddTeacherLayout />,
                },
              ],
            },
            {
              path: "students",
              element: <StudentsLayout />,
            },
            {
              path: "subjects",
              element: <SubjectsLayout />,
            },
            {
              path: "classes",
              element: <ClassesLayout />,
            },
          ],
        },
        /* Teacher */
        // {
        //   path:'',
        //   element:<TeacerClasses/>
        // }
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
