import { useEffect, useState } from "react";
import {
  EmailInput,
  Loading,
  PasswordInput,
  SubmitButton,
} from "../../Components/Components";
// Make sure the file path is correct and the image exists in the specified location
import photo from "../../assets/Images/image1.png";
import { useAuth } from "../../Context/Auth";
import { useNavigate } from "react-router-dom";
import { usePost } from "../../Hooks/usePost";

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const { postData, loadingPost, response } = usePost({
    url: `${apiUrl}/api/auth/login`,
  }); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Use uppercase "D"

    if (!email) {
      auth.toastError("اضف البريد الالكتروني");
      return;
    }
    if (!password) {
      auth.toastError("اضف كلمة المرور");
      return;
    }
    const payload = {
      email,
      password,
    };

    postData(payload); // Call postData with formData
  };

  useEffect(() => {
    if (response) {
      console.log("response", response);
      if (response.data.user.role === "admin") {
        navigate("/dashboard/teachers", { replace: true });
      } else if (response.data.user.role === "teacher") {
        navigate("/schedule_sessions", { replace: true });
      }
      auth.loginUser(response.data.user);

    }
  }, [response]);
  return (
    <>
      <form
        onSubmit={handleLogin}
        className="w-full flex items-center justify-center mx-auto h-screen overflow-hidden"
      >
        <div className="w-11/12 flex items-start justify-between h-5/6">
          <div className="sm:w-full xl:w-5/12 flex flex-col items-start justify-start gap-y-8 h-full">
            {loadingPost ? (
              <>
                <div className="w-full h-full">
                  <Loading width={100} height={100} />
                </div>
              </>
            ) : (
              <>
                <div className="flex w-full flex-col items-start justify-start gap-y-4 mt-20">
                  <span className="w-full text-center text-5xl font-TextFontMedium text-thirdColor drop-shadow-lg">
                    الغرس
                  </span>
                </div>
                <div className="w-full flex flex-col justify-center gap-y-10 h-3/5">
                  <div className="w-full flex flex-col justify-center gap-y-6">
                    <div className="w-11/12 mx-auto">
                      <EmailInput
                        value={email}
                        required={false}
                        placeholder={"الايميل"}
                        isSign={true}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="w-11/12 mx-auto">
                      <PasswordInput
                        value={password}
                        placeholder={"كلمة المرور"}
                        required={false}
                        isSign={true}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="w-11/12 mx-auto">
                    <SubmitButton
                      bgColor="thirdColor"
                      width="w-full"
                      type="submit"
                      withIcon={false}
                      withShare={false}
                      text={"تسجيل الدخول"}
                      handleClick={() => handleLogin}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="sm:hidden xl:flex w-2/4  items-center justify-center h-full">
            {/* <LoginBackground /> */}
            <img
              src={photo}
              className="drop-shadow-xl rounded-2xl p-2"
              alt="logo"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
