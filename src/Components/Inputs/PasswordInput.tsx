import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import classNames from "classnames";

interface PasswordInputProps {
  value: string;
  isSign: boolean;
  borderColor?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  backgound?: string;
  iconDirection?: boolean;
  textDirection?: boolean;
  paddingLeft?: string;
  paddingRight?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  isSign = true,
  borderColor = "none",
  placeholder,
  required = true,
  onChange,
  backgound = "bg-secoundBgColor",
  iconDirection = true,
  textDirection = true,
  paddingLeft = "pl-8",
  paddingRight = "pr-2",
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className={`${isSign ? "h-14" : ""} relative w-full `}>
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className={classNames(
            `w-full h-full border-2 outline-none 
            ${
              isSign
                ? `px-2 py-8 text-thirdColor text-3xl ${paddingRight} ${paddingLeft}`
                : "p-3 text-InputColor text-2xl border-2"
            } shadow ${backgound} font-TextFontRegular rounded-2xl`,
            textDirection ? "text-right" : "text-left", // Text alignment logic
            // paddingLeft, // Dynamic padding left
            // paddingRight, // Dynamic padding right
            {
              "border-none": borderColor === "none",
              "border-mainColor": borderColor === "mainColor", // Add more cases for different border colors
              "border-thirdColor": borderColor === "thirdColor", // Example of another color
            }
          )}
          value={value}
          onChange={onChange}
          required={required}
        />
        {show ? (
          <IoMdEye
            className={`absolute ${isSign? 'top-7/12':'top-6/12'} transform -translate-y-2/4 ${
              iconDirection ? "left-2" : "right-2"
            } text-3xl text-thirdColor cursor-pointer`}
            onClick={() => setShow(!show)}
          />
        ) : (
          <IoMdEyeOff
            className={`absolute ${isSign? 'top-7/12':'top-6/12'} transform -translate-y-2/4 ${
              iconDirection ? "left-2" : "right-2"
            } text-3xl text-thirdColor cursor-pointer`}
            onClick={() => setShow(!show)}
          />
        )}
      </div>
    </>
  );
};

export default PasswordInput;
