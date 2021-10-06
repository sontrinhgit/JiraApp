import axios from "axios"
import { DOMAIN_JIRA } from "../utils/constant/settingSystem"

export const PriorityService = {
    getPriority: () => {
        return axios ({
            url: `${DOMAIN_JIRA}/Priority/getAll`,
            method: 'GET'
        })
    }
}
