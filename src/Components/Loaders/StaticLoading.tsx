import { BeatLoader } from "react-spinners";

const StaticLoader = () => {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <BeatLoader color="#14c5c6" size={20} />
        {/* <BeatLoader  color='#9E090F' size={20} /> */}
      </div>
    </>
  );
};

export default StaticLoader;
