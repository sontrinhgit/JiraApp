import React from "react";

import { Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { withFormik } from "formik";

import {signinJiraAction} from '../../../redux/actions/JiraAction'

import * as Yup from "yup";

import {connect} from 'react-redux';
import { USER_SIGNIN_API } from "../../../redux/constant/JiraConstant/JiraConst";

function LoginJira(props) {


  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
    // dung formik boc thang LoginJira lai nen thang LoginJira co nhung thuoc tinh cua formik 

  return (
    <form
      onSubmit={handleSubmit}
      className="container"
      style={{ height: window.innerHeight }}
    >
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        
        <div className="d-flex" style={{ flexDirection: "column" }}>
          <Input
            placeholder="email"
            onChange={handleChange}
            name="email"
            prefix={<UserOutlined />}
          />
          <br />
        </div>
        <div className="text-danger mb-2">{errors.email}</div>

        <div className="d-flex" style={{ flexDirection: "column" }}>
          <Input
            placeholder="Password"
            onChange={handleChange}
            name="password"
            type='password'
            prefix={<LockOutlined />}
          />
          <br />
        </div>
        <div className="text-danger mb-2">{errors.password}</div>
        <Button htmlType="submit" type="primary">
          Log in
        </Button>
      </div>
    </form>
  );
}

const LoginWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),

  // Custom sync validation
  validationSchema: Yup.object().shape({
    email: Yup.string().required("Email is required").email("email is invalid"),
    password: Yup.string()
      .min(6, "Password must have min 6 characters")
      .max(32, "Maximum is 32 characters"),
  }),

  handleSubmit: ({email,password}, {props, setSubmitting }) => {
    
    setSubmitting(true)
    props.dispatch(signinJiraAction(email,password));
    // chuyen trang duoc hay k la tuy thuoc vao file Saga, vi Saga se xu ly du lieu, day chi dispatch action len saga 

    
  },

  displayName: "BasicForm",
})(LoginJira);

export default connect()(LoginWithFormik);
