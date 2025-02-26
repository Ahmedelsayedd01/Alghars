import styled from "styled-components";

interface SwitchProps {
  handleClick: () => void;
  checked: boolean;
  bgcolor?: boolean;
}

const Switch: React.FC<SwitchProps> = ({ handleClick, checked, bgcolor }) => {
  return (
    <$StyledWrapper $bgcolor={bgcolor ? "true" : undefined}>
      <label className="switch">
        <input
          type="checkbox"
          onClick={handleClick}
          checked={checked}
          readOnly
        />
        <span className="slider" />
      </label>
    </$StyledWrapper>
  );
};

const $StyledWrapper = styled.div<{ $bgcolor?: string }>`
  .switch {
    font-size: 10px;
    position: relative;
    display: inline-block;
    width: 64px;
    height: 32px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #9d9d9d;
    transition: 0.4s;
    border-radius: 30px;
    border: 1px solid transparent;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 25px;
    width: 25px;
    border-radius: 16px;
    right: 4px;
    top: 2.8px;
    background-color: white;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: ${(props) =>
      props.$bgcolor === "true" ? "#0bb388" : "#14c5c6"};
  }

  input:checked + .slider:before {
    transform: translateX(-30px);
  }
`;

export default Switch;
