import axios from "axios"
import { DOMAIN_JIRA, TOKEN } from '../utils/constant/settingSystem';

export const TaskTypeService = {
    getTaskType: () => {
        return axios ({
            url: `${DOMAIN_JIRA}/TaskType/getAll`,
            method: 'GET'
        })
    },
    createTask: (newTask) => {
        return axios ({
            url: `${DOMAIN_JIRA}/Project/createTask`,
            method: 'POST',
            data: newTask,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //library JWT to render the token 
        })
    }
}
