interface EmailInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  backgound?: string;
  placeholderSize?: boolean;
  borderColor?: string;
  paddinLeft?: string;
  paddinRight?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  required = true,
  placeholder,
  backgound = "secoundBgColor",
  placeholderSize = false,
  borderColor = "none",
  paddinLeft = "pl-2",
  paddinRight = "pr-2",
}) => {
  return (
    <>
      <div className="w-full h-14">
        <input
          type="email"
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full border-2 rounded-2xl border-${borderColor}
                                   outline-none px-2 py-3 shadow ${paddinLeft} ${paddinRight}
                                   ${placeholderSize ? "text-xl" : "text-3xl"} 
                                   font-TextFontRegular bg-${backgound} text-2xl text-thirdColor
                                   valueInput`}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default EmailInput;
