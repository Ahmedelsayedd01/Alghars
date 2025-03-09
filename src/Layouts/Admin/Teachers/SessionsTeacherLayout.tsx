import { useState } from "react";
import { TitleSection } from "../../../Components/Components";
import { SessionsTeacherPage } from "../../../Pages/Pages";

const SessionsTeacherLayout = () => {
  const [nameTec, setNameTec] = useState("");
  return (
    <>
      <TitleSection text={`حصص المعلم ${nameTec}`} navIcon={true} />
      <SessionsTeacherPage
        nameTitle={(name: string | undefined) => setNameTec(name || "")}
      />
    </>
  );
};

export default SessionsTeacherLayout;
