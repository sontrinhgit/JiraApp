
const stateDefault = {
    projectList: [],
    projectDetail: {

    },

    //tao ra mot state moi cho projectList vi so anh huong den trang chu 
    arrProject: [],
}

export const ProjectJiraReducer = (state = stateDefault,action) => {
    switch(action.type){
        case 'GET_LIST_PROJECT': {
            state.projectList = action.projectList;
            return {...state};
        }
        case 'PUT_PROJECT_DETAIL' : {
            state.projectDetail = action.projectDetail;
            return {...state};
        }

        case 'GET_ALL_PROJECT' : {
            state.arrProject = action.arrProject;
            return {...state};
        }
        default: return {...state}
    }
}