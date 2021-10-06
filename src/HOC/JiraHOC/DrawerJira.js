import React, { useState } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

const { Option } = Select;

const DrawerJira = (props) => {
  //truyen vao gia tri props de gui di gia tri visible => bat cu trang nao cung co the nhan duoc gia tri visible de kich hoat no
  /* const [state, setState] = useState({
    visible: false,
  }); */

  //bay h se lay thang visible tu redux ve chu k phai dat state o day

  const { visible, ComponentContentDrawer, callBackSubmit, title } = useSelector((state) => state.DrawerReducer);
  console.log("visible", visible);

  //Lay gia tri open va close tu redux ve chu thay vi lay gia tri tu day nhu mac dinh

  const dispatch = useDispatch();

  const showDrawer = () => {
    dispatch({
      type: "OPEN_DRAWER",
    
    });
  };

  const onClose = () => {
    dispatch({
      type: "CLOSE_DRAWER",
      
    });
  };

  return (
    <>
    
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
       
        {ComponentContentDrawer}
        <Button onClick={onClose} style={{marginRight:0}}>
        Cancel
      </Button>
      <Button onClick={callBackSubmit} type="primary" style={{marginTop: '-10'}}>
        Submit
      </Button>
    
      </Drawer>
      </>
  );
};

export default DrawerJira;
