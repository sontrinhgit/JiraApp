import "./App.css";
import { Switch, useHistory } from "react-router-dom";
import { useEffect } from "react";

import "./index.css";

import { JiraTemplate } from "./templates/HomeTemplate/JiraTemplate";
import { UserTemplate } from "./templates/HomeTemplate/UserTemplate";
import LoginJira from "./pages/Jira/LoginJira/LoginJira";

import { useDispatch } from "react-redux";
import indexJira from "./redux/sagas/Jira/indexJira";

import CreateProject from "./pages/Jira/CreateProject/CreateProject";
import ProjectManagement from "./pages/Jira/ProjectManagement/ProjectManagement";
import DrawerJira from "./HOC/JiraHOC/DrawerJira";
import IndexJira from "./redux/sagas/Jira/indexJira";


function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "ADD_HISTORY",
      history: history,
    });
  }, []);

  return (
    //BrowerRouter phai bao ben ngoai ca App va Redux thi history moi nhan duoc gia tri cua Router
    <>
      <DrawerJira />
 
      <Switch>


    

        <UserTemplate path="/" exact Component={LoginJira} />
        <UserTemplate path="/login" exact Component={LoginJira} />
        <JiraTemplate path="/jirabugs" exact Component={IndexJira} />
        <JiraTemplate exact path="/createproject" Component={CreateProject} />
        <JiraTemplate exact path ="/projectManagement" Component={ProjectManagement}/>
        <JiraTemplate exact path = "/detail/:id" Component={IndexJira} />
        <JiraTemplate
          exact
          path="/projectmanagement"
          Component={ProjectManagement}
        />
      </Switch>
    </>
  );
}

export default App;
