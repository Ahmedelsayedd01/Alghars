import logo from "../../assets/Images/logo.png";
import { LogoProps } from "../../types";

const Loading = ({ width, height }: LogoProps) => {
  return <img src={logo} alt="Logo" width={width} height={height} />;
};

export default Loading;
