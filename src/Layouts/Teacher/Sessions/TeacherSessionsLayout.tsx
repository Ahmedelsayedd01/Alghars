import { Titlepage } from "../../../Components/Components";
import { TeacherSessionsPage } from "../../../Pages/Pages";

const TeacherSessionsLayout = () => {
  return (
    <div className="min-h-[80vh] pb-32 flex flex-col items-center justify-start">
      <Titlepage text={"قائمة الحصص"} navIcon={true} />
      <TeacherSessionsPage />
    </div>
  );
};

export default TeacherSessionsLayout;
