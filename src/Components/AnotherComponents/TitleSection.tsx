import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const TitleSection = ({
  text,
  navIcon,
}: {
  text: string;
  navIcon: boolean;
}) => {
  const navigate = useNavigate();
  const handleGoBack = (): void => {
    navigate(-1 as any, { replace: true });
  };

  return (
    <>
      <div className="w-full pt-4 pb-5">
        <span className="flex items-center text-3xl font-TextFontMedium text-secondColor">
          {navIcon ? (
            <IoIosArrowForward
              size={40}
              className="cursor-pointer"
              onClick={handleGoBack}
            />
          ) : (
            ""
          )}
          {text}
        </span>
      </div>
    </>
  );
};

export default TitleSection;
