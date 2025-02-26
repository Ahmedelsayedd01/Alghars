import { TitleSection } from "../../../Components/Components";
import { AddStudentPage } from "../../../Pages/Pages";

const AddStudentLayout = () => {
  return (
    <>
      <TitleSection text={"اضافة الطالب"} navIcon={true} />
      <AddStudentPage />
    </>
  );
};

export default AddStudentLayout;
