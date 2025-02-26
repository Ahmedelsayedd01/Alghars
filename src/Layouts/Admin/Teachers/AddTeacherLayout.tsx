import { TitleSection } from "../../../Components/Components";
import { AddTeacherPage } from "../../../Pages/Pages";

const AddTeacherLayout = () => {
  return (
    <>
      <TitleSection text={"اضافة معلم"} navIcon={true} />
      <AddTeacherPage />
    </>
  );
};

export default AddTeacherLayout;
