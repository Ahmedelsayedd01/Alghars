import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { LoginPage, SessionPage } from "./Pages/Pages";
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
  TeacherSessionsLayout,
  TeachersLayout,
} from "./Layouts/Layouts";

export const router = createBrowserRouter(
  [
    /* Login */
    {
      path: "/login",
      element: (
        <ProtectedRoute isLogin>
          <LoginPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "dashboard",
          element: <ProtectedRoute role="admin" />,
          children: [
            { path: "teachers", element: <TeachersLayout /> },
            { path: "teachers/add", element: <AddTeacherLayout /> },
            {
              path: "teachers/edit/:teacherId",
              element: <EditTeacherLayout />,
            },
            { path: "students", element: <StudentsLayout /> },
            { path: "students/add", element: <AddStudentLayout /> },
            {
              path: "students/edit/:studentId",
              element: <EditStudentLayout />,
            },
            { path: "subjects", element: <SubjectsLayout /> },
            { path: "subjects/add", element: <AddSubjectLayout /> },
            {
              path: "subjects/edit/:subjectId",
              element: <EditSubjectLayout />,
            },
            { path: "classes", element: <ClassesLayout /> },
            { path: "classes/add", element: <AddClassLayout /> },
            { path: "classes/edit/:classId", element: <EditClassLayout /> },
          ],
        },
        {
          path: "sessions",
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute role="teacher">
                  <TeacherSessionsLayout />
                </ProtectedRoute>
              ),
            },
            { path: "session/:sessionId", element: <SessionPage /> },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
