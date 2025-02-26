import { useState } from "react";
import { ButtonAdd, Switch, TextInput } from "../../../Components/Components";

const AddSubjectPage = () => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectStatus, setSubjectStatus] = useState(0);

  const handleSubjectStatus = () => {
    const Active = subjectStatus;
    {
      Active === 0 ? setSubjectStatus(1) : setSubjectStatus(0);
    }
  };

  const handleAdd = () => {};

  return (
    <form>
      <div className="w-full flex flex-wrap sm:flex-col lg:flex-row items-center justify-start gap-4 sm:mb-8 lg:mb-0">
        {/* Subject Name */}
        <TextInput
          title={"اسم المادة:"}
          value={subjectName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSubjectName(e.target.value)
          }
          placeholder="ادخل اسم المادة"
        />
        {/* Subject Status */}
        <div className="sm:w-full lg:w-[26%] flex items-center justify-start gap-x-2 mt-7">
          <span className="text-2xl font-TextFontMedium text-thirdColor mt-2">
            الحالة:
          </span>
          {/* Subject Status */}
          <Switch
            bgcolor={false}
            checked={subjectStatus === 1}
            handleClick={handleSubjectStatus}
          />
        </div>
      </div>
      {/* Button Add */}
      <div className="w-full flex justify-end items-center">
        <ButtonAdd handleClick={handleAdd} />
      </div>
    </form>
  );
};

export default AddSubjectPage;
