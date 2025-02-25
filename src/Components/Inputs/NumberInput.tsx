import React, { ChangeEvent } from "react";

interface NumberInputProps {
  title: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  backgound?: string;
  placeholderSize?: boolean;
  borderColor?: string;
  paddinLeft?: string;
  paddinRight?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  title,
  value,
  onChange,
  placeholder,
  backgound = "white",
  placeholderSize = false,
  borderColor = "none",
  paddinLeft = "pl-2",
  paddinRight = "pr-2",
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Filter non-numeric characters in the value
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    // Update the value in the event object before passing it up
    event.target.value = numericValue;
    onChange(event); // Pass the modified event to the parent's onChange handler
  };

  return (
    <div className="sm:w-full lg:w-[26%] flex flex-col items-start justify-center gap-y-2">
      <span className="text-xl font-TextFontMedium text-thirdColor">
        {title}
      </span>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        className={`w-full border-2 rounded-2xl border-${borderColor}
                                   outline-none p-2  shadow ${paddinLeft} ${paddinRight}
                                   ${placeholderSize ? "text-lg" : "text-2xl"} 
                                   font-TextFontRegular bg-${backgound} text-InputColor
                                   valueInput`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default NumberInput;
