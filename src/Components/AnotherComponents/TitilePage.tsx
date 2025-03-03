import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Titlepage = ({ text, navIcon }: { text: string; navIcon: boolean }) => {
  const navigate = useNavigate();
  const handleGoBack = (): void => {
    navigate(-1 as any, { replace: true });
  };

  return (
    <>
      <div className="w-full pt-4 pb-5">
        <div className="flex items-center justify-between text-3xl font-TextFontMedium text-secondColor">
          {navIcon ? (
            <IoIosArrowForward
              size={35}
              className="cursor-pointer"
              onClick={handleGoBack}
            />
          ) : (
            ""
          )}
          <span
            className={`${
              navIcon
                ? "sm:w-[65%] lg:w-[60%] xl:w-[55%]"
                : "w-full text-center"
            }`}
          >
            {text}
          </span>
        </div>
      </div>
    </>
  );
};

export default Titlepage;
