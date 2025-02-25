interface EmailInputProps {
  value: string;
  isSign: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  backgound?: string;
  // placeholderSize?: boolean;
  borderColor?: string;
  paddinLeft?: string;
  paddinRight?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  value,
  isSign = true,
  onChange,
  required = true,
  placeholder,
  backgound = "secoundBgColor",
  // placeholderSize = false,
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
                          outline-none ${
                            isSign
                              ? "px-2 py-3 text-thirdColor text-3xl"
                              : "p-3 text-InputColor text-2xl"
                          } shadow ${paddinLeft} ${paddinRight}
                          font-TextFontRegular bg-${backgound} 
                          valueInput`}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default EmailInput;

/*  ${
            isSign ? "pl-2 pr-2 text-thirdColor" : "p-2 text-InputColor"
          } */
