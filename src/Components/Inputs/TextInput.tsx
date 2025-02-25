interface TextInputProps {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  backgound?: string;
  placeholderSize?: boolean;
  borderColor?: string;
  paddinLeft?: string;
  paddinRight?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  title,
  onChange,
  placeholder,
  backgound = "white",
  placeholderSize = false,
  borderColor = "none",
  paddinLeft = "pl-2",
  paddinRight = "pr-2",
}) => {
  return (
    <>
      {/* Name Input */}
      <div className="sm:w-full lg:w-[26%] flex flex-col items-start justify-center gap-y-2">
        <span className="text-xl font-TextFontMedium text-thirdColor">
          {title}
        </span>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className={`w-full border-2 rounded-2xl border-${borderColor}
                                   outline-none p-2  shadow ${paddinLeft} ${paddinRight}
                                   ${placeholderSize ? "text-lg" : "text-2xl"} 
                                   font-TextFontRegular bg-${backgound} text-InputColor
                                   valueInput`}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default TextInput;
