/* Authantication */
export { default as UnauthorizedPage } from "./Custom/UnauthorizedPage";
export { default as NotFoundPage } from "./Custom/NotFoundPage";
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
// Admin-> Subscriptions
export { default as SubscriptionsPage } from "./Admin/SubscriptionPages/SubscriptionsPage";
export { default as AddSubscriptionPage } from "./Admin/SubscriptionPages/AddSubscriptionPage";
export { default as EditSubscriptionPage } from "./Admin/SubscriptionPages/EditSubscriptionPage";
// Admin-> Sessions
export { default as SessionsPage } from "./Admin/SessionPages/SessionsPage";
export { default as ClassesHistoryPage } from "./Admin/SessionPages/SessionsPage";
export { default as AddClassPage } from "./Admin/SessionPages/AddClassPage";
export { default as EditClassPage } from "./Admin/SessionPages/EditClassPage";

/* Teacher */
export { default as SchedulesPage} from "./Teacher/ScheduleTeacher/SchedulesPage";
export { default as TeacherSessionsPage} from "./Teacher/Sessions/TeacherSessionsPage";
export { default as SessionPage } from "./Teacher/Session/SessionPage";
