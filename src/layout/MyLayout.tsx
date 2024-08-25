import MyHeader from "../layout/MyHeader";
import { useEffect, useState } from "react";
import { Layout, Drawer, Button } from "antd"; // Importa Drawer para pantallas pequeñas
import { WebRouter } from "../routes/WebRoute";
import { useMediaQuery } from "react-responsive";
import MySider from "./MySider";
import { LeftOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const MyLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (isSmallScreen) {
      setShowSidebar(false);
    } else setShowSidebar(true);
  }, [isSmallScreen]);

  return (
    <Layout className="global-layout">
      {isSmallScreen ? (
        <Drawer
          placement="left"
          closable={false}
          onClose={() => setShowSidebar(false)}
          open={showSidebar}
          width={80}
          drawerStyle={{ backgroundColor: "#001529" }}
        >
          <div className="layout-drawer">
            <MySider collapsed={true} />
            <div
              className="layout-drawer-close-btn"
              onClick={() => setShowSidebar(false)}
            >
              <LeftOutlined />
            </div>
          </div>
        </Drawer>
      ) : (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <MySider collapsed={collapsed} />
        </Sider>
      )}

      <Layout className="content-layout">
        <Header className="layout-header">
          <MyHeader setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
        </Header>

        <Content>
          <WebRouter />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
