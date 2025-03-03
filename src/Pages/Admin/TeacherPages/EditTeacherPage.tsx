import { useEffect, useRef, useState } from "react";
import {
  ButtonAdd,
  DropDown,
  EmailInput,
  NumberInput,
  PasswordInput,
  StaticLoader,
  Switch,
  TextInput,
  UploadInput,
} from "../../../Components/Components";
import { Obj } from "../../../types";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { usePost } from "../../../Hooks/usePost";
import { useAuth } from "../../../Context/Auth";

interface HandleImageClickProps {
  ref: React.RefObject<HTMLInputElement>;
}

interface EditTeacherPageProps {
  nameTitle: (id: number | undefined) => void;
}

const EditTeacherPage = ({ nameTitle }: EditTeacherPageProps) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { teacherId } = useParams();
  const teacherPhoto = useRef<HTMLInputElement>(null!);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const { postData, loadingPost, response } = usePost({
    url: `${apiUrl}/admin/teacher/update/${teacherId}`,
  });

  const [teacherName, setTeacherName] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");
  const [teacherAddress, setTeacherAddress] = useState("");

  const [teacherPhotoName, setTeacherPhotoName] = useState("");
  const [teacherPhotoFile, setTeacherPhotoFile] = useState<File | null>(null);

  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");

  const [teacherStatus, setTeacherStatus] = useState(0);

  const [selectedSubject, setSelectedSubject] = useState<Obj | null>(null);
  const subjects = useSelector((state: any) => state.subjects.data);

  useEffect(() => {
    console.log("teacherId", teacherId);
    nameTitle(teacherId ? parseInt(teacherId) : undefined);
  }, [teacherId]);

  useEffect(() => {
    console.log("selectedSubject", selectedSubject);
  }, [selectedSubject]);

  interface HandleImageChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

  const handleImageChange = (e: HandleImageChangeEvent) => {
    const file = e.target.files?.[0];
    if (file) {
      setTeacherPhotoFile(file);
      setTeacherPhotoName(file.name);
    }
  };

  const handleImageClick = ({ ref }: HandleImageClickProps) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleTeacherStatus = () => {
    const Active = teacherStatus;
    {
      Active === 0 ? setTeacherStatus(1) : setTeacherStatus(0);
    }
  };

  useEffect(() => {
    if (response && response.status === 200) {
      navigate(-1 as any, { replace: true });
    }
    console.log("response", response);
  }, [response]);

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!teacherName) {
      auth.toastError("اضف اسم المعلم");
      return;
    }
    if (!teacherPhone) {
      auth.toastError("اضف هاتف المعلم");
      return;
    }
    if (!teacherAddress) {
      auth.toastError("اضف عنوان المعلم");
      return;
    }
    if (!teacherPhotoFile) {
      auth.toastError("اضف صورة المعلم");
      return;
    }
    if (!teacherEmail) {
      auth.toastError("اضف البريد الالكتروني");
      return;
    }

    const payload = {
      name: teacherName,
      phone: teacherPhone,
      address: teacherAddress,
      avatar: teacherPhotoFile ? teacherPhotoFile.name : "",
      subject: selectedSubject?.id?.toString() || "",
      email: teacherEmail,
      password: teacherPassword,
      status: teacherStatus === 1 ? "active" : "inactive",
    };

    postData(payload, "تم تعديل المعلم بنجاح");
  };

  return (
    <>
      {loadingPost ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <form>
          <div className="w-full flex flex-wrap sm:flex-col lg:flex-row items-center justify-start gap-4 sm:mb-8 lg:mb-0">
            {/* Teacher Name */}
            <TextInput
              title={"اسم المعلم:"}
              value={teacherName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTeacherName(e.target.value)
              }
              placeholder="ادخل اسم المعلم"
            />

            {/* Teacher Phone */}
            <NumberInput
              title={"رقم الهاتف:"}
              value={teacherPhone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTeacherPhone(e.target.value)
              }
              placeholder="ادخل رقم الهاتف"
            />

            {/* Teacher Address */}
            <TextInput
              title={" العنوان:"}
              value={teacherAddress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTeacherAddress(e.target.value)
              }
              placeholder="ادخل العنوان"
            />

            {/* Teacher Photo */}
            <div className="sm:w-full lg:w-[26%] flex flex-col items-start justify-center gap-y-2">
              <span className="text-xl font-TextFontMedium text-thirdColor">
                الصورة:
              </span>
              <UploadInput
                value={teacherPhotoName}
                uploadFileRef={teacherPhoto}
                placeholder="اختر صورة"
                handleFileChange={handleImageChange}
                onClick={() => handleImageClick({ ref: teacherPhoto })}
              />
            </div>

            {/* Teacher Subject*/}
            <DropDown
              title={"المادة:"}
              value={selectedSubject}
              onChange={(e: { value: Obj }) => setSelectedSubject(e.value)}
              items={subjects}
              placeholder={"اختر المادة"}
            />

            {/* Teacher Email && Password */}
            <div className="sm:w-full lg:w-[26%] flex flex-col items-start justify-center gap-y-2">
              <span className="text-xl font-TextFontMedium text-thirdColor">
                البريد الالكتروني:
              </span>
              <EmailInput
                isSign={false}
                value={teacherEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTeacherEmail(e.target.value);
                }}
                placeholder="ادخل البريد الالكتروني"
                backgound="white"
              />
            </div>
            <div className="sm:w-full lg:w-[26%] flex flex-col items-start justify-center gap-y-1">
              <span className="text-xl font-TextFontMedium text-thirdColor">
                كلمة المرور:
              </span>
              <PasswordInput
                isSign={false}
                value={teacherPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTeacherPassword(e.target.value);
                }}
                placeholder="ادخل كلمة المرور"
                backgound="bg-white"
              />
            </div>
            <div className="sm:w-full lg:w-[26%] flex items-center justify-start gap-x-2 mt-7">
              <span className="text-2xl font-TextFontMedium text-thirdColor mt-2">
                الحالة:
              </span>
              {/* Teacher Status */}
              <Switch
                bgcolor={false}
                checked={teacherStatus === 1}
                handleClick={handleTeacherStatus}
              />
            </div>
          </div>
          {/* Button Add */}
          <div className="w-full flex justify-end items-center">
            <ButtonAdd text="تعديل" handleClick={() => handleEdit} />
          </div>
        </form>
      )}
    </>
  );
};

export default EditTeacherPage;
