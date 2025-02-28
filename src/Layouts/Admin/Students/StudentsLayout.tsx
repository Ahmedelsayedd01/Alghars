import { useNavigate } from "react-router-dom";
import { SubmitButton, TitleSection } from "../../../Components/Components";
import { StudentsPage } from "../../../Pages/Pages";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";

const StudentsLayout = () => {
  const navigate = useNavigate();
  const studentStore = useSelector((state: any) => state.students.data);
  /*   const StudentsStore = useSelector((state: any) => state.Students.data); */

  interface student {
    id: number;
    name: string;
    category: string;
    parentPhone: string;
    address: string;
    countClass: number;
    image_link: string;
    payment: string;
    status: string;
  }

  const handleShare = () => {
    const data = studentStore.map((student: student, index: number) => ({
      "#": index + 1,
      Name: `${student?.name || "-"}`,
      Category: `${student?.category || "-"}`,
      "Parent Phone": `${student?.parentPhone || "-"}`,
      Address: `${student?.address || "-"}`,
      Classes: `${student?.countClass || "-"}`,
      Payment: `${student?.payment || "-"}`,
      Status: student.status === 'active' ? "يعمل" : "متوقف",
    }));

    // Create a new workbook and add the data
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Define custom column widths
    worksheet["!cols"] = [
      { wch: 5 }, // Column for "#"
      { wch: 20 }, // Column for "Name"
      { wch: 20 }, // Column for "Category"
      { wch: 25 }, // Column for "Parent Phone"
      { wch: 30 }, // Column for "Address"
      { wch: 10 }, // Column for "Classes"
      { wch: 20 }, // Column for "Payment"
      { wch: 10 }, // Column for "Status"
    ];

    // Append the customized worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, "students");

    // Export the file
    XLSX.writeFile(workbook, "students_data.xlsx");
  };
  return (
    <div className="mb-28">
      <div className="w-full flex items-center justify-between">
        <TitleSection text={"قائمة الطلاب"} navIcon={false} />
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
            text={"اضافة طالب"}
            handleClick={() => navigate("/dashboard/students/add")}
            withIcon={true}
            withShare={false}
            px="px-0"
            width="w-48"
            bgColor={"secondColor"}
            rounded="rounded-xl"
          />
        </div>
      </div>
      <StudentsPage />
    </div>
  );
};

export default StudentsLayout;
