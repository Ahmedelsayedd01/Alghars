interface IconProps {
  width?: string;
  height?: string;
}
const WarningIcon = ( { width = "24", height = "24" }: IconProps) => {
  return (
    <svg
      className={`w-${width} h-${height} mx-auto mb-4 text-red-600`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

export default WarningIcon;
