import { FaPlus } from "react-icons/fa";

interface SubmitButtonProps {
  width?: string;
  type?: "submit" | "reset" | "button"; // Update the type to match the allowed values

  text: string;
  bgColor?: string;
  Color?: string;
  px?: string;
  rounded?: string;
  handleClick: () => void;
  withIcon: boolean;
}

const SubmitButton = ({
  width = "w-full",
  type = "submit",
  text,
  bgColor ,
  Color = "white",
  px = "px-7",
  rounded = "rounded-xl",
  withIcon = false,
  handleClick,
}: SubmitButtonProps) => {
  return (
    <button
      type={type}
      className={`bg-${bgColor} ${width} text-${Color} sm:text-xl lg:text-2xl  cursor-pointer font-TextFontRegular ${rounded} pt-2 py-3 ${px}
                 border-${bgColor} border-2 hover:bg-white hover:text-${bgColor} duration-300 ease-in-out
                 flex items-center justify-center gap-x-2
                 `}
      onClick={handleClick}
    >
      {text}
      {withIcon ? <FaPlus size={18} /> : ""}
    </button>
  );
};
export default SubmitButton;
