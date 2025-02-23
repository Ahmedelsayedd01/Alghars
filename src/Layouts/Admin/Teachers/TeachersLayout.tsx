import { useState } from "react";
import { TitleSection } from "../../../Components/Components";
import { AddTeacherSection, TeachersPage } from "../../../Pages/Pages";

const TeachersLayout = () => {
  const [update, setUpdate] = useState(false);
  return (
    <>
      <TitleSection text={"اضافة معلم"} />
      <AddTeacherSection update={update} setUpdate={setUpdate} />
      <TitleSection text={"قائمة المعلمين"} />
      <TeachersPage refetch={update} />
    </>
  );
};

export default TeachersLayout;
