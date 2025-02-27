interface DateInputProps {
  required?: boolean;
  minDate?: boolean;
  maxDate?: boolean;
  borderColor?: "none" | "mainColor";
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  required = true,
  minDate = true,
  maxDate = true,
  borderColor = "none",
  title,
  value,
  onChange,
  placeholder,
}) => {
  const currentDay = new Date(); // Define currentDay
  const formattedDate = currentDay.toISOString().split("T")[0]; // Format as YYYY-MM-DD

  return (
    <>
      <div className="sm:w-full lg:w-[26%] flex flex-col items-start justify-center gap-y-2">
        <span className="text-xl font-TextFontMedium text-thirdColor">
          {title}
        </span>
        <input
          type="date"
          placeholder={placeholder} // Add this prop to the component
          className={`w-full border-2 rounded-2xl border-${borderColor}
                                   outline-none p-2  shadow  text-2xl 
                                   font-TextFontRegular bg-white text-InputColor
                                   valueInput`}
          value={value}
          onChange={onChange}
          min={minDate ? formattedDate : ""} // Use the correctly formatted date
          max={maxDate ? formattedDate : ""}
          required={required}
        />
      </div>
    </>
  );
};

export default DateInput;
