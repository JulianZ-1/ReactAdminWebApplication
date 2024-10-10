import { theme, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { Outlet } from 'react-router-dom'
import CommonAside from "../compoemts/commonAside/CommAside";
import CommonHeader from "../compoemts/commonHeader/commonHeader";
import { useAppSelector } from "../store";

const Main: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const isCollapse = useAppSelector((state) => state.tab.isCollapse)

  return (
    <Layout className='main-container'>
      <CommonAside tabClose={isCollapse} />
      <Layout>
        <CommonHeader tabOpen={isCollapse} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main