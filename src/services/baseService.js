import axios from "axios";
import {
  DOMAIN_JIRA,
  TOKEN,
  USER_LOGIN,
} from "../utils/constant/settingSystem";

export class baseService {
  //put json ve backend
  put = (url, model) => {
    return axios({
      url: `${DOMAIN_JIRA}/${url}`,
      method: "PUT",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //library JWT to render the token
    });
  };

  post = (url, model) => {
    return axios({
      url: `${DOMAIN_JIRA}/${url}`,
      method: "PUT",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //library JWT to render the token
    });
  };
  get = (url) => {
    return axios({
      url: `${DOMAIN_JIRA}/${url}`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //library JWT to render the token
    });
  };
  delete = (url) => {
    return axios({
      url: `${DOMAIN_JIRA}/${url}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //library JWT to render the token
    });
  };
}
