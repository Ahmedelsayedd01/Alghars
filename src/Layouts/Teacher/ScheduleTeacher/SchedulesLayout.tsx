import { Titlepage } from "../../../Components/Components";
import { SchedulesPage } from "../../../Pages/Pages";

const SchedulesLayout = () => {
  return (
    <div className="min-h-[80vh] pb-32 flex flex-col items-center justify-start">
      <Titlepage text={'قائمة الايام'} navIcon={false} />
      <SchedulesPage />
    </div>
  );
};

export default SchedulesLayout;
