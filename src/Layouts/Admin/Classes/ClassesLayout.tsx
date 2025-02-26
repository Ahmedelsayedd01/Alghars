import { useNavigate } from "react-router-dom";
import { SubmitButton, TitleSection } from "../../../Components/Components";
import { ClassesPage } from "../../../Pages/Pages";

const ClassesLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-28">
      <div className="w-full flex items-center justify-between">
        <TitleSection text={"قائمة الحصص"} navIcon={false} />
        <div className="flex items-center justify-between gap-x-1">
          <SubmitButton
            type="button"
            text={"اضافة حصة"}
            handleClick={() => navigate("/dashboard/classes/add")}
            withIcon={true}
            withShare={false}
            px="px-0"
            width="w-48"
            bgColor={"secondColor"}
            rounded="rounded-xl"
          />
        </div>
      </div>
      <ClassesPage />
    </div>
  );
};

export default ClassesLayout;
