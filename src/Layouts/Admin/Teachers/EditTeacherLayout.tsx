import { useState } from "react";
import { TitleSection } from "../../../Components/Components";
import { EditTeacherPage } from "../../../Pages/Pages";

const EditTeacherLayout = () => {
  const [nameTec, setNameTec] = useState("");
  return (
    <>
      <TitleSection text={`تعديل المعلم ${nameTec}`} navIcon={true} />
      <EditTeacherPage
        nameTitle={(id: number | undefined) => setNameTec(id?.toString() || "")}
      />
    </>
  );
};

export default EditTeacherLayout;
