import { useEffect, useRef, useState } from "react";
import {
  ButtonAdd,
  EmailInput,
  NumberInput,
  PasswordInput,
  StaticLoader,
  Switch,
  TextInput,
  UploadInput,
} from "../../../Components/Components";
import { usePost } from "../../../Hooks/usePost";
import { useAuth } from "../../../Context/Auth";

interface HandleImageClickProps {
  ref: React.RefObject<HTMLInputElement>;
}

const AddTeacherPage = () => {
  const auth = useAuth();
  const teacherPhoto = useRef<HTMLInputElement>(null!);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const { postData, loadingPost, response } = usePost({
    url: `${apiUrl}/admin/teacher/create`,
  });

  const [teacherName, setTeacherName] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");
  const [teacherAddress, setTeacherAddress] = useState("");

  const [teacherPhotoName, setTeacherPhotoName] = useState("");
  const [teacherPhotoFile, setTeacherPhotoFile] = useState<File | null>(null);

  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");

  const [teacherStatus, setTeacherStatus] = useState(0);

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
  const handleReset = () => {
    setTeacherName("");
    setTeacherPhone("");
    setTeacherAddress("");
    setTeacherPhotoName("");
    setTeacherPhotoFile(null);
    setTeacherEmail("");
    setTeacherPassword("");
    setTeacherStatus(0);
  };

  useEffect(() => {
    if (response && response.data.status === "success") {
      handleReset();
    }
    console.log("response.status", response);
  }, [response]);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (teacherName === "") {
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
    if (!teacherPassword) {
      auth.toastError("اضف كلمة المرور");
      return;
    }

    const formData = new FormData();
    formData.append("name", teacherName);
    formData.append("phone", teacherPhone);
    formData.append("address", teacherAddress);
    if (teacherPhotoFile) {
      formData.append("avatar", teacherPhotoFile);
    }
    formData.append("email", teacherEmail);
    formData.append("password", teacherPassword);
    formData.append("status", teacherStatus === 1 ? "active" : "inactive");

    postData(formData, "تم اضافة المعلم بنجاح");
  };

  return (
    <>
      {loadingPost ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <form onSubmit={handleAdd}>
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

            {/* Teacher Email && Password */}
            <div className="sm:w-full lg:w-[26%] flex flex-col items-start justify-center gap-y-2">
              <span className="text-xl font-TextFontMedium text-thirdColor">
                البريد الالكتروني:
              </span>
              <EmailInput
                value={teacherEmail}
                isSign={false}
                required={false}
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
                value={teacherPassword}
                isSign={false}
                required={false}
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
            <ButtonAdd handleClick={() => handleAdd} />
          </div>
        </form>
      )}
    </>
  );
};

export default AddTeacherPage;
