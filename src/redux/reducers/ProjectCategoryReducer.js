const stateDefault = {
    arrProjectCategory: []
}

export const ProjectCategoryReducer = (state = stateDefault, action) => {
    switch(action.type) {

        case 'GET_ALL_PROJECT_CATEGORY' : {
            state.arrProjectCategory = action.data //lay action theo gia tri ben redux 
            return {...state}
        }
        default:return {...state}
    }
}

