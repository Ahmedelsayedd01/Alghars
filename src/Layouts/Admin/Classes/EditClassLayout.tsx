import { useState } from "react";
import { TitleSection } from "../../../Components/Components";
import { EditClassPage } from "../../../Pages/Pages";

const EditClassLayout = () => {
  const [nameTec, setNameTec] = useState("");
  return (
    <>
      <TitleSection text={`تعديل حصة ${nameTec}`} navIcon={true} />
      <EditClassPage
        nameTitle={(name: string) => setNameTec(name|| "")}
      />
    </>
  );
};

export default EditClassLayout;
