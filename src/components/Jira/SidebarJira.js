import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarsOutlined,
  PlusOutlined,
  SearchOutlined
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import FormCreateTask from "../Forms/FormCreateTask/FormCreateTask";

const { Header, Sider, Content } = Layout;

const SidebarJira = () => {
  const [state, setState] = useState({
    collapsed: false,
  });

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  const dispatch = useDispatch();

  return (
    <div>
    
      <Sider trigger={null} collapsible collapsed={state.collapsed} style = {{height: '100%'}}>
      <div className="text-right" onClick={toggle}><BarsOutlined style={{cursor: 'pointer', color: 'white', fontSize:'20px'}} /></div>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<PlusOutlined /> } onClick={()=>{
            dispatch({
              type: 'OPEN_FORM_NEW_TASK',
              ComponentContentDrawer: <FormCreateTask />,
              title: 'Create Task',

            })
          }}> 
            Create Task
          </Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined />}>
            Search Issue
          </Menu.Item>
        </Menu>
      </Sider>
      </div>
   
  );
};

export default SidebarJira;
