import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1 as any, { replace: true });
  };
  return (
    <>
      <section className="bg-white h-[100vh] flex justify-center">
        <div className="m-auto max-w-screen-xl">
          <div className="mx-auto max-w-screen text-center">
            <p className="sm:mb-10 md:mb-16 sm:text-2xl md:text-6xl text-[#d0071e] font-TextFontSemiBold">
              ليس لديك صلاحية للوصول لهذه الصفحة
            </p>
            <span
              onClick={handleBack}
              className="text-white font-TextFontMedium text-2xl px-5 py-2 rounded-2xl border-[#bd0zqc] border-2  bg-[#bd071c] hover:text-[#bd071c] hover:bg-white cursor-pointer transition-all ease-in-out duration-300"
            >
              الرجوع الى الصفحة السابقة
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default UnauthorizedPage;
