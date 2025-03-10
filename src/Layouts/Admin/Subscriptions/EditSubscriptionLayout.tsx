import { useState } from "react";
import { TitleSection } from "../../../Components/Components";
import { EditSubscriptionPage } from "../../../Pages/Pages";

const EditSubscriptionLayout = () => {
  const [nameTec, setNameTec] = useState("");
  return (
    <>
      <TitleSection text={`تعديل الاشتراك ${nameTec}`} navIcon={true} />
      <EditSubscriptionPage
        nameTitle={(name: string | undefined) => setNameTec(name || "")}
      />
    </>
  );
};

export default EditSubscriptionLayout;
