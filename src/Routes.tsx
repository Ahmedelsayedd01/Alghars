import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "./App";
import {
  LoginPage,
  SchedulesPage,
  SessionPage,
  TeacherSessionsPage,
} from "./Pages/Pages";
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
  SchedulesLayout,
  StudentsLayout,
  SubjectsLayout,
  TeacherSessionLayout,
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
          path: "schedule_sessions",
          element: (
            <ProtectedRoute role="teacher">
              <Outlet />
            </ProtectedRoute>
          ),
          children: [
            { index: true, element: <SchedulesLayout /> },
            {
              path: "sessions",
              element: <TeacherSessionsLayout />,
            },
            { path: "sessions/session/:sessionId", element: <TeacherSessionLayout /> },
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
