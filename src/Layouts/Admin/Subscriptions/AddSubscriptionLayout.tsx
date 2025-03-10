import { TitleSection } from "../../../Components/Components";
import { AddSubscriptionPage } from "../../../Pages/Pages";

const AddSubscriptionLayout = () => {
  return (
    <>
      <TitleSection text={"اضافة اشتراك"} navIcon={true} />
      <AddSubscriptionPage />
    </>
  );
};

export default AddSubscriptionLayout;
