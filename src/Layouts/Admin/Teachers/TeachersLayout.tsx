import { useNavigate } from "react-router-dom";
import { SubmitButton, TitleSection } from "../../../Components/Components";
import { TeachersPage } from "../../../Pages/Pages";

const TeachersLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-28">
      <div className="w-full flex items-center justify-between">
        <TitleSection text={"قائمة المعلمين"} navIcon={false} />
        <SubmitButton
          type="button"
          withIcon={true}
          handleClick={() => navigate("/dashboard/teachers/add")}
          text={"اضافة معلم"}
          bgColor="secondColor"
          Color="white"
          px="px-0"
          rounded="rounded-xl"
          width="w-48"
        />
      </div>
      <TeachersPage />
    </div>
  );
};

export default TeachersLayout;
