import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProtectedLogin from "./ProtectedAuth/ProtectedLogin";
import { LoginPage } from "./Pages/Pages";
import ProtectedRoute from "./ProtectedAuth/ProtectedRoute";
import {
  AddClassLayout,
  AddStudentLayout,
  AddSubjectLayout,
  AddTeacherLayout,
  ClassesLayout,
  EditClassLayout,
  EditStudentLayout,
  EditSubjectLayout,
  EditTeacherLayout,
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
                {
                  path: "edit/:teacherId",
                  element: <EditTeacherLayout />,
                },
              ],
            },
            {
              path: "students",
              children: [
                {
                  path: "",
                  element: <StudentsLayout />,
                },
                {
                  path: "add",
                  element: <AddStudentLayout />,
                },
                {
                  path: "edit/:studentId",
                  element: <EditStudentLayout />,
                },
              ],
            },
            {
              path: "subjects",
              children: [
                {
                  path: "",
                  element: <SubjectsLayout />,
                },
                {
                  path: "add",
                  element: <AddSubjectLayout />,
                },
                {
                  path: "edit/:subjectId",
                  element: <EditSubjectLayout />,
                },
              ],
            },
            {
              path: "classes",
              children: [
                {
                  path: "",
                  element: <ClassesLayout />,
                },
                {
                  path: "add",
                  element: <AddClassLayout />,
                },
                {
                  path: "edit/:classId",
                  element: <EditClassLayout />,
                },
              ],
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
