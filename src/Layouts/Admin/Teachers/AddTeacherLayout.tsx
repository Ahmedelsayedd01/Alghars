import { TitleSection } from "../../../Components/Components";
import { AddTeacherPage } from "../../../Pages/Pages";

const AddTeacherLayout = () => {
  return (
    <div className="">
      <TitleSection text={"اضافة معلم"} navIcon={true} />
      <AddTeacherPage />
    </div>
  );
};

export default AddTeacherLayout;
