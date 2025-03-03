import { Titlepage } from "../../../Components/Components";
import { SessionPage } from "../../../Pages/Pages";

const SessionLayout = () => {
  return (
    <div className="min-h-[80vh] pb-32 flex flex-col items-center justify-start">
      <Titlepage text={"الحصة"} navIcon={true} />
      <SessionPage />
    </div>
  );
};

export default SessionLayout;
