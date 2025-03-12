import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1 as any, { replace: true });
  };
  return (
    <>
      <section className="bg-white h-[100vh] flex justify-center">
        <div className="m-auto max-w-screen-xl">
          <div className="mx-auto max-w-screen text-center">
            <h1 className="sm:text-[10rem] font-TextFontBold text-[#bd071c]">
              404
            </h1>
            <p className="mb-10 text-4xl tracking-tight font-TextFontSemiBold  md:text-6xl">
              صفحة غير موجودة
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

export default NotFoundPage;
