import { TitleSection } from "../../../Components/Components";
import { TeachersPage } from "../../../Pages/Pages";


const TeachersLayout = () => {

  return (
    <div className="mb-28">
      <div className="w-full flex items-center justify-between">
        <TitleSection text={"قائمة المعلمين"} navIcon={false} />
        {/* <div className="flex items-center justify-between gap-x-1">
          <SubmitButton
            type="button"
            text={"مشاركة"}
            handleClick={handleShare}
            withIcon={false}
            withShare={true}
            px="px-0"
            width="w-48"
            bgColor={"secondColor"}
            rounded="rounded-xl"
          />
          <SubmitButton
            type="button"
            text={"اضافة معلم"}
            handleClick={() => navigate("/dashboard/teachers/add")}
            withIcon={true}
            withShare={false}
            px="px-0"
            width="w-48"
            bgColor={"secondColor"}
            rounded="rounded-xl"
          />
        </div> */}
      </div>
      <TeachersPage />
    </div>
  );
};

export default TeachersLayout;
