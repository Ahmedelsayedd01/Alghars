interface SubmitButtonProps {
  width?: string;
  type?: "submit" | "reset" | "button"; // Update the type to match the allowed values

  text: string;
  bgColor?: string;
  Color?: string;
  Size?: string;
  px?: string;
  rounded?: string;
  handleClick: () => void;
}

const SubmitButton = ({
  width = "w-full",
  type = "submit",
  text,
  bgColor = "bg-mainColor",
  Color = "text-white",
  Size = "text-2xl",
  px = "px-7",
  rounded = "rounded-xl",
  handleClick,
}: SubmitButtonProps) => {
  return (
    <button
      type={type}
      className={`${bgColor} ${width} ${Color} ${Size} cursor-pointer font-TextFontRegular ${rounded} pt-2 py-3 ${px}
                 border-mainColor border-2 hover:bg-white hover:text-mainColor duration-300 ease-in-out
                 `}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
export default SubmitButton;
