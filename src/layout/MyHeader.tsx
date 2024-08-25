import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { FC, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { Image } from "antd";
import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";

interface MyHeaderProps {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
}

const MyHeader: FC<MyHeaderProps> = ({ showSidebar, setShowSidebar }) => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="layout-header-content">
      {!showSidebar ? (
        <div className="m-1" onClick={() => setShowSidebar(!showSidebar)}>
          <Image
            className="layout-logo logo"
            width={50}
            height={50}
            src={logo}
            preview={false}
          />
        </div>
      ) : (
        <div />
      )}
      <div
        className="layout-header-effect mr-20"
        onClick={user ? logout : () => navigate("/auth/login")}
      >
        {user ? (
          <>
            logout <LogoutOutlined />
          </>
        ) : (
          <>
            login <LoginOutlined />
          </>
        )}
      </div>
    </div>
  );
};

export default MyHeader;
