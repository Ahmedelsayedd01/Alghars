import { FaPlus } from "react-icons/fa";
interface ButtonAddProps {
  isWidth?: boolean;
  text?: string;
  BgColor?: string;
  Size?: string;
  handleClick: () => void;
  iconColor?: string;
}

const ButtonAdd = ({
  isWidth = false,
  text = "اضافة",
  BgColor = "thirdColor",
  handleClick,
}: ButtonAddProps) => {
  return (
    <button
      type="submit"
      className={`bg-${BgColor} ${
        isWidth ? "w-full" : ""
      } sm:w-full lg:w-[200px] flex items-center justify-center gap-x-2 cursor-pointer text-2xl text-white font-TextFontRegular p-2 
               border-2 border-thirdColor hover:bg-transparent hover:text-thirdColor duration-300 ease-in-out
              hover:shadow-lg transform hover:-translate-y-1 active:scale-95 
              rounded-xl
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-thirdColor
              group
              `}
      onClick={handleClick}
    >
      <FaPlus />
      <span> {text}</span>
    </button>
  );
};
export default ButtonAdd;
