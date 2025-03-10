import { TitleSection } from "../../../Components/Components";
import { SessionsPage } from "../../../Pages/Pages";

const SessionsLayout = () => {
  return (
    <div className="mb-28">
      <TitleSection text={"قائمة الحصص"} navIcon={false} />
      <SessionsPage />
    </div>
  );
};

export default SessionsLayout;
