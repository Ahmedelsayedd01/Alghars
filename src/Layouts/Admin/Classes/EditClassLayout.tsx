import { useState } from "react";
import { TitleSection } from "../../../Components/Components";
import { EditClassPage } from "../../../Pages/Pages";

const EditClassLayout = () => {
  const [nameTec, setNameTec] = useState("");
  return (
    <>
      <TitleSection text={`تعديل الحصة ${nameTec}`} navIcon={true} />
      <EditClassPage
        nameTitle={(id: number | undefined) => setNameTec(id?.toString() || "")}
      />
    </>
  );
};

export default EditClassLayout;
