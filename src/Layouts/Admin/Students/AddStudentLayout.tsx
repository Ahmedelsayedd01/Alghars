import { TitleSection } from "../../../Components/Components";
import { AddStudentPage } from "../../../Pages/Pages";

const AddStudentLayout = () => {
  return (
    <>
      <TitleSection text={"اضافة طالب"} navIcon={true} />
      <AddStudentPage />
    </>
  );
};

export default AddStudentLayout;
