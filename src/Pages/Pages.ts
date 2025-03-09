/* Authantication */
export { default as LoginPage } from "./Registration/LoginPage";
/* Admin */
// Admin-> Teachers
export { default as TeachersPage } from "./Admin/TeacherPages/TeachersPage";
export { default as AddTeacherPage } from "./Admin/TeacherPages/AddTeacherPage";
export { default as SessionsTeacherPage } from "./Admin/TeacherPages/SessionsTeacherPage";
export { default as EditTeacherPage } from "./Admin/TeacherPages/EditTeacherPage";
// Admin-> Students
export { default as StudentsPage } from "./Admin/StudentPages/StudentsPage";
export { default as AddStudentPage } from "./Admin/StudentPages/AddStudentPage";
export { default as EditStudentPage } from "./Admin/StudentPages/EditStudentPage";
// Admin-> Subjects
export { default as SubjectsPage } from "./Admin/SubjectPages/SubjectsPage";
export { default as AddSubjectPage } from "./Admin/SubjectPages/AddSubjectPage";
export { default as EditSubjectPage } from "./Admin/SubjectPages/EditSubjectPage";
// Admin-> Classes
export { default as ClassesPage } from "./Admin/ClassPages/ClassesPage";
export { default as ClassesHistoryPage } from "./Admin/ClassPages/ClassesPage";
export { default as AddClassPage } from "./Admin/ClassPages/AddClassPage";
export { default as EditClassPage } from "./Admin/ClassPages/EditClassPage";

/* Teacher */
export { default as SchedulesPage} from "./Teacher/ScheduleTeacher/SchedulesPage";
export { default as TeacherSessionsPage} from "./Teacher/Sessions/TeacherSessionsPage";
export { default as SessionPage } from "./Teacher/Session/SessionPage";
