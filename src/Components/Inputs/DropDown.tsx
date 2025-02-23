import { Dropdown } from "primereact/dropdown";

interface DropDownProps {
  title: string;
  value: any;
  onChange: any;
  items: any;
  placeholder: string;
}
const DropDown = ({
  title,
  value,
  onChange,
  items,
  placeholder,
}: DropDownProps) => {
  return (
    <>
      <div className="sm:w-full lg:w-[25%] flex flex-col items-start justify-center gap-y-2">
        <span className="text-xl font-TextFontMedium text-thirdColor">
          {title}
        </span>
        <Dropdown
          value={value}
          onChange={onChange}
          options={items}
          optionLabel="name"
          placeholder={placeholder}
          className="w-full outline-none text-InputColor valueInput"
          style={{
            borderRadius: "1rem",
            outline: "none",
            boxShadow: "none",
            border: "none",
          }}
        />
      </div>
    </>
  );
};
export default DropDown;
