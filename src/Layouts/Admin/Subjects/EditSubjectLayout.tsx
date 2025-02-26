import { useState } from "react";
import { TitleSection } from "../../../Components/Components";
import { EditSubjectPage } from "../../../Pages/Pages";

const EditSubjectLayout = () => {
  const [nameTec, setNameTec] = useState("");
  return (
    <>
      <TitleSection text={`تعديل المادة ${nameTec}`} navIcon={true} />
      <EditSubjectPage
        nameTitle={(id: number | undefined) => setNameTec(id?.toString() || "")}
      />
    </>
  );
};

export default EditSubjectLayout;
