import { useNavigate } from "react-router-dom";
import { SubmitButton, TitleSection } from "../../../Components/Components";
import { SessionsPage } from "../../../Pages/Pages";

const SessionsLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-28">
      <TitleSection text={"قائمة الحصص"} navIcon={false} />
      <SessionsPage />
    </div>
  );
};

export default SessionsLayout;
