import MyHeader from "../layout/MyHeader";

import { useEffect, useState } from "react";

import { Layout } from "antd";
import { WebRouter } from "../routes/WebRoute";
import { useMediaQuery } from "react-responsive";
import MySider from "./MySider";

const { Header, Content, Sider } = Layout;

const MyLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    if (isSmallScreen) {
      setShowSidebar(false);
    } else setShowSidebar(true);
  }, [isSmallScreen]);

  return (
    <Layout className="global-layout">
      {showSidebar && (
        <Sider
          className="layout-screen-sidebar"
          collapsible
          collapsed={isSmallScreen ? showSidebar : collapsed}
          onCollapse={
            isSmallScreen
              ? (value) => setShowSidebar(value)
              : (value) => setCollapsed(value)
          }
        >
          <MySider collapsed={isSmallScreen ? true : collapsed} />
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
