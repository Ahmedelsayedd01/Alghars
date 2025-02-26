import { useNavigate } from "react-router-dom";
import { SubmitButton, TitleSection } from "../../../Components/Components";
import { SubjectsPage } from "../../../Pages/Pages";

const SubjectsLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-28">
      <div className="w-full flex items-center justify-between">
        <TitleSection text={"قائمة المواد"} navIcon={false} />
        <div className="flex items-center justify-between gap-x-1">
          <SubmitButton
            type="button"
            text={"اضافة مادة"}
            handleClick={() => navigate("/dashboard/subjects/add")}
            withIcon={true}
            withShare={false}
            px="px-0"
            width="w-48"
            bgColor={"secondColor"}
            rounded="rounded-xl"
          />
        </div>
      </div>
      <SubjectsPage />
    </div>
  );
};

export default SubjectsLayout;
