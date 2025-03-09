import { IoSearch } from "react-icons/io5";

interface SearchBarProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}
const SearchBar = ({
  value,
  handleChange,
  placeholder = "بحث",
}: SearchBarProps) => {
  return (
    <div className="w-full relative">
      <input
        type="text"
        name="search"
        onChange={handleChange}
        value={value}
        className={`w-full h-full shadow pl-12 pr-4 py-3 rounded-3xl outline-none font-TextFontMedium 
                            placeholder:text-mainColor
                            bg-mainBgColor
                            text-mainColor
                            text-lg
                            `}
        placeholder={placeholder}
      />
      <IoSearch className="absolute top-[0.9rem] left-4 text-mainColor font-TextFontSemiBold text-2xl" />
    </div>
  );
};

export default SearchBar;
