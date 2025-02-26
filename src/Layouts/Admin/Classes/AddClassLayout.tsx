import { TitleSection } from "../../../Components/Components";
import { AddClassPage } from "../../../Pages/Pages";

const AddClassLayout = () => {
  return (
    <>
      <TitleSection text={"اضافة حصة"} navIcon={true} />
      <AddClassPage />
    </>
  );
};

export default AddClassLayout;
