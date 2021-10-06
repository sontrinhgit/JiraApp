import axios from "axios"
import { DOMAIN_JIRA, TOKEN } from "../utils/constant/settingSystem"

export const UserService = {
    getUser : (keyWord) => {
       return axios({
            url: `${DOMAIN_JIRA}/Users/getUser?keyword=${keyWord}`,
            method: 'GET',
            headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //library JWT to render the token
        })
    }, 
    assignUser : (userProject) => {
        return axios({
             url: `${DOMAIN_JIRA}/Project/assignUserProject`,
             method: 'POST',
             data: userProject,
             headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}, //library JWT to render the token
         })
     }, 
     deleteUserFromProject : (userProject) => {
        return axios({
            url: `${DOMAIN_JIRA}/Project/removeUserFromProject`,
            method: 'POST',
            data: userProject,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}, //library JWT to render the token
        })
     }
   
}