import { TitleSection } from "../../../Components/Components";
import { StudentsPage } from "../../../Pages/Pages";

const StudentsLayout = () => {
  return (
    <div className="mb-28">
      <TitleSection text={"قائمة الطلاب"} navIcon={false} />
      <StudentsPage />
    </div>
  );
};

export default StudentsLayout;
