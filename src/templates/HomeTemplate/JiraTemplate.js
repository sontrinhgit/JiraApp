import React from "react";
import { Route } from "react-router-dom";
import "../../index.css";
import SidebarJira from "../../components/Jira/SidebarJira";
import MenuJira from "../../components/Jira/MenuJira";
import HeaderMain from "../../components/Jira/Main/HeaderMain";
import ContentMain from "../../components/Jira/Main/ContentMain";
import InfoMain from "../../components/Jira/Main/InfoMain";
import ModalJira from "../../components/Jira/ModalJira/ModalJira";
export const JiraTemplate = (props) => {
  const { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <>
            <div className="jira">
              <SidebarJira />
              <MenuJira />
                <Component {...propsRoute} />
              <ModalJira />
            </div>
          </>
        );
      }}    
    />
  );
};
