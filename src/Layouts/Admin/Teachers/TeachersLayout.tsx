import { useNavigate } from "react-router-dom";
import { SubmitButton, TitleSection } from "../../../Components/Components";
import { TeachersPage } from "../../../Pages/Pages";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";

const TeachersLayout = () => {
  const navigate = useNavigate();
  const teacherStore = useSelector((state: any) => state.teachers.data);
  /*   const teachersStore = useSelector((state: any) => state.teachers.data); */

  interface Teacher {
    id: number;
    name: string;
    email: string;
    subject: string;
    phone: string;
    address: string;
    countClass: number;
    status: string;
  }

  const handleShare = () => {
    const data = teacherStore.map((teacher: Teacher, index: number) => ({
      "#": index + 1,
      Name: `${teacher?.name || "-"}`,
      Email: `${teacher?.email || "-"}`,
      Subject: `${teacher?.subject || "-"}`,
      Phone: `${teacher?.phone || "-"}`,
      Address: `${teacher?.address || "-"}`,
      CountClass: `${teacher?.countClass || "-"}`,
      Status: teacher.status === 'active' ? "يعمل" : "متوقف",
    }));

    // Create a new workbook and add the data
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Define custom column widths
    worksheet["!cols"] = [
      { wch: 5 }, // Column for "#"
      { wch: 20 }, // Column for "Name"
      { wch: 25 }, // Column for "Email"
      { wch: 20 }, // Column for "Subject"
      { wch: 20 }, // Column for "Phone"
      { wch: 30 }, // Column for "Address"
      { wch: 5 }, // Column for "CountClass"
      { wch: 10 }, // Column for "Status"
    ];

    // Append the customized worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, "Teachers");

    // Export the file
    XLSX.writeFile(workbook, "teachers_data.xlsx");
  };
  return (
    <div className="mb-28">
      <div className="w-full flex items-center justify-between">
        <TitleSection text={"قائمة المعلمين"} navIcon={false} />
        <div className="flex items-center justify-between gap-x-1">
          <SubmitButton
            type="button"
            text={"مشاركة"}
            handleClick={handleShare}
            withIcon={false}
            withShare={true}
            px="px-0"
            width="w-48"
            bgColor={"secondColor"}
            rounded="rounded-xl"
          />
          <SubmitButton
            type="button"
            text={"اضافة معلم"}
            handleClick={() => navigate("/dashboard/teachers/add")}
            withIcon={true}
            withShare={false}
            px="px-0"
            width="w-48"
            bgColor={"secondColor"}
            rounded="rounded-xl"
          />
        </div>
      </div>
      <TeachersPage />
    </div>
  );
};

export default TeachersLayout;
