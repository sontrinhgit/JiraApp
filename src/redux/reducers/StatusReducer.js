const initialState = {
    arrStatus : []
}

// eslint-disable-next-line import/no-anonymous-default-export
export const StatusReducer =  (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_STATUS' :
            return {...state, arrStatus : action.arrStatus}
        default: 
            return state 
    }
}