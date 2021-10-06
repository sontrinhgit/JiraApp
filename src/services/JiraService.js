import axios from "axios"
import { DOMAIN_JIRA, TOKEN } from "../utils/constant/settingSystem"

export const JiraService = {
    signinJira : (userLogin) => {
       return axios({
            url: `${DOMAIN_JIRA}/Users/signin`,
            method: 'POST',
            data: userLogin
        })
    }, 

    getProjectCategory: () => {
        return axios({
            url: `${DOMAIN_JIRA}/ProjectCategory`,
            method: 'GET',

        })
    },
    createProject: (newProject) => {
        return axios({
            url: `${DOMAIN_JIRA}/Project/createProject`,
            method: 'POST',
            data: newProject,
        })
    },
    createProjectAuthorization : (newProject) => {
        return axios({
            url: `${DOMAIN_JIRA}/Project/createProjectAuthorize`,
            method: 'POST',
            data: newProject,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //library JWT to render the token 
        })
    },
    getListProject: () => {
        return axios ({
            url: `${DOMAIN_JIRA}/Project/getAllProject`,
           method: 'GET', 
           headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
           //token yeu cau tu backend du chung minh la user da dang nhap roi 
        })
    },
    updateProject: (projectUpdate) => {
        return axios ({
            url: `${DOMAIN_JIRA}/Project/updateProject?projectId=${projectUpdate.id}`,
           method: 'PUT', 
           data: projectUpdate,
           headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    },
    deleteProject: (id) => {
        return axios ({
            url: `${DOMAIN_JIRA}/Project/deleteProject?projectId=${id}`,
           method: 'DELETE', 
           headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    },
    getProjectDetail: (id) => {
        return axios ({
            url: `${DOMAIN_JIRA}/Project/getProjectDetail?id=${id}`,
           method: 'GET', 
           headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    },
    getAllStatus : () => {
        return axios({
            url: `${DOMAIN_JIRA}/Status/getAll`,
           method: 'GET',
        })
    }
}