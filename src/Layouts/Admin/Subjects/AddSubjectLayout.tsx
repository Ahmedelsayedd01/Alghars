import { TitleSection } from "../../../Components/Components";
import { AddSubjectPage } from "../../../Pages/Pages";

const AddSubjectLayout = () => {
  return (
    <>
      <TitleSection text={"اضافة مادة"} navIcon={true} />
      <AddSubjectPage />
    </>
  );
};

export default AddSubjectLayout;
