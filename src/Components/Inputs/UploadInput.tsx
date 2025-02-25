import { LuUpload } from "react-icons/lu";
import { ChangeEvent, MouseEvent, RefObject } from "react";

interface UploadInputProps {
  uploadFileRef: RefObject<HTMLInputElement>;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  borderColor?: string;
  placeholder?: string;
  placeholderSize?: boolean;
  value?: string;
  readonly?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: MouseEvent<HTMLInputElement>) => void;
}

const UploadInput = ({
  uploadFileRef,
  handleFileChange,
  borderColor = "none",
  placeholder,
  placeholderSize = false,
  value,
  readonly = true,
  onChange,
  onClick,
}: UploadInputProps) => {
  return (
    <>
      <div className="relative w-full h-12">
        <input
          type="text"
          placeholder={placeholder}
          className={`w-full border-2 rounded-2xl border-${borderColor}  bg-white
                       outline-none p-2  shadow cursor-pointer   ${
            placeholderSize ? "text-lg" : "text-2xl"
          } font-TextFontRegular text-InputColor cursor-pointer eleValueInput`}
          value={value}
          onClick={onClick}
          onChange={onChange}
          readOnly={readonly}
          required
        />
        <LuUpload
          className={`absolute left-3 top-3 text-thirdColor text-2xl cursor-pointer `}
        />
      </div>
      <input
        type="file"
        className="hidden"
        onChange={handleFileChange}
        ref={uploadFileRef}
      />
    </>
  );
};

export default UploadInput;
