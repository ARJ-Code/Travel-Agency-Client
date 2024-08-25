import { Button } from "antd";
import { FC, ReactNode } from "react";

interface FloatingButtonProps {
  icon: ReactNode;
  onClick: () => void;
}

const FloatingButton: FC<FloatingButtonProps> = ({ icon, onClick }) => {
  return (
    <Button
      type="primary"
      shape="circle"
      icon={icon}
      size="large"
      className="floating-button"
      onClick={onClick}
    />
  );
};

export default FloatingButton;
