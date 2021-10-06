import React from "react";
import {
  AVATAR_1,
  AVATAR_2,
  AVATAR_3,
} from "../../../utils/constant/settingSystem";
import ReactHtmlParser from "react-html-parser";

const InfoMain = (props) => {

  const renderAvatar = () => {
    //dung optional changing boi vi k co thong tin gi tu user trong lan dau tien o redux 
    return props.members.members?.map((user,index) => {
      return <div key={index} className="avatar">
        <img src={user.avatar} alt="userAvatar"></img>
      </div>
    })
  }


  return (
    <div>
      <section>
        {ReactHtmlParser(props.members.description)}
      </section>
      <div className="info" style={{ display: "flex" }}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
         {renderAvatar()}
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div>
      </div>
    </div>
  );
};

export default InfoMain;
