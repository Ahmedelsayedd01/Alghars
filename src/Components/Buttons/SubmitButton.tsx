// import { FaPlus } from "react-icons/fa";
// import { IoShareSocial } from "react-icons/io5";

// interface SubmitButtonProps {
//   width?: string;
//   type?: "submit" | "reset" | "button"; // Update the type to match the allowed values

//   text: string;
//   bgColor?: string;
//   Color?: string;
//   px?: string;
//   rounded?: string;
//   handleClick: () => void;
//   withIcon: boolean;
//   withShare: boolean;
// }

// const SubmitButton = ({
//   width = "w-full",
//   type = "submit",
//   text,
//   bgColor,
//   Color = "white",
//   px = "px-7",
//   rounded = "rounded-xl",
//   withIcon = false,
//   withShare = false,
//   handleClick,
// }: SubmitButtonProps) => {
//   return (
//     <button
//       type={type}
//       className={`bg-${bgColor} ${width} text-${Color} sm:text-xl lg:text-2xl  cursor-pointer font-TextFontRegular ${rounded} pt-2 py-3 ${px}
//                  border-${bgColor} border-2 hover:bg-white hover:text-${bgColor} duration-300 ease-in-out
//                  flex items-center justify-center gap-x-2
//                  `}
//       onClick={handleClick}
//     >
//       {text}
//       {withIcon ? <FaPlus size={18} /> : ""}
//       {withShare ? <IoShareSocial size={25} /> : ""}
//     </button>
//   );
// };
// export default SubmitButton;
import { FaPlus } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";

interface SubmitButtonProps {
  width?: string;
  type?: "submit" | "reset" | "button";
  text: string;
  bgColor?: string;
  px?: string;
  rounded?: string;
  handleClick: () => void;
  withIcon?: boolean;
  withShare?: boolean;
}

// Map allowed colors
const colorMapping: { [key: string]: string } = {
  secondColor:
    "bg-secondColor text-white border-2 border-secondColor hover:bg-white hover:text-secondColor",
  mainColor:
    "bg-mainColor text-white border-2 border-mainColor hover:bg-white hover:text-mainColor",
  thirdColor:
    "bg-thirdColor text-white border-2 border-thirdColor hover:bg-white hover:text-thirdColor",
};

const SubmitButton = ({
  width = "w-full",
  type = "submit",
  text,
  bgColor = "secondColor",
  px = "px-7",
  rounded = "rounded-xl",
  withIcon = false,
  withShare = false,
  handleClick,
}: SubmitButtonProps) => {
  const colorClass = colorMapping[bgColor] || "";

  return (
    <button
      type={type}
      className={`
        ${colorClass} ${width} sm:text-xl lg:text-2xl cursor-pointer font-TextFontRegular 
        ${rounded} pt-2 py-3 ${px} duration-300 ease-in-out flex items-center justify-center gap-x-2
      `}
      onClick={handleClick}
    >
      {text}
      {withIcon && <FaPlus size={18} />}
      {withShare && <IoShareSocial size={25} />}
    </button>
  );
};

export default SubmitButton;
