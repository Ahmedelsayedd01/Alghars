import { TitleSection } from "../../../Components/Components";
import { TeachersPage } from "../../../Pages/Pages";

const TeachersLayout = () => {
  return (
    <div className="mb-28">
      <TitleSection text={"قائمة المعلمين"} navIcon={false} />
      <TeachersPage />
    </div>
  );
};

export default TeachersLayout;
