import { USER_LOGIN } from "../../utils/constant/settingSystem"
import { USLOGIN } from "../constant/JiraConstant/JiraConst"
 //lam ra UserJiraReducer de co the luu duoc token cua user vao application, khi ma f5 thi se k bi mat di thong tin nguoi dung. Thong tin nay se duoc luu vap store va duoc luu vao root cua ung dung 

let usLogin = {}
if (localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault = {
    userLogin : usLogin,
    userSearch: []
}

export const UserJiraReducer = (state = stateDefault, action) => {
    switch(action.type){
        case USLOGIN : {
            state.userLogin = action.userLogin; // khi dang nhap bang mot ten khac thi store se luu ten moi vao chu k phai chi co mot account default 
            return {...state}
        }

        case 'GET_USER_SEARCH' : {
            state.userSearch = action.userSearch;
            return {...state}
        }
        default : return {...state}
    }
}
