import { FaPlus } from "react-icons/fa";
interface ButtonAddProps {
  isWidth?: boolean;
  Text?: string;
  BgColor?: string;
  Color?: string;
  Size?: string;
  handleClick: () => void;
  iconColor?: string;
}

const ButtonAdd = ({
  isWidth = false,
  Text = "Add",
  BgColor = "thirdColor",
  Color = "white",
  handleClick,
}: ButtonAddProps) => {
  return (
    <button
      type="submit"
      className={`bg-${BgColor} ${
        isWidth ? "w-full" : ""
      } flex items-center justify-center gap-x-2 cursor-pointer text-xl text-${Color} font-TextFontRegular pt-2 p-3 
              border-mainColor border-2 hover:bg-transparent hover:text-mainColor duration-300 ease-in-out
              hover:shadow-lg transform hover:-translate-y-1 active:scale-95 
              rounded-xl
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainColor
              group
              `}
      onClick={handleClick}
    >
      <FaPlus />
      <span> {Text}</span>
    </button>
  );
};
export default ButtonAdd;
