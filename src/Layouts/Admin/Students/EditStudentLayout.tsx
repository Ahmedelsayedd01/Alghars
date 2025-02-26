import { useState } from "react";
import { TitleSection } from "../../../Components/Components";
import { EditStudentPage } from "../../../Pages/Pages";

const EditStudentLayout = () => {
  const [nameStu, setNameStu] = useState("");
  return (
    <>
      <TitleSection text={`تعديل الطالب ${nameStu}`} navIcon={true} />
      <EditStudentPage
        nameTitle={(id: number | undefined) => setNameStu(id?.toString() || "")}
      />
    </>
  );
};

export default EditStudentLayout;
