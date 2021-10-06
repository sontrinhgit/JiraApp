const initialState = {

  arrPriority: []

}

// eslint-disable-next-line import/no-anonymous-default-export
export const PriorityReducer = (state=initialState, action) => {
  switch (action.type) {
      case 'GET_PRIORITY_REDUCER': 
          return {...state, arrPriority: action.arrPriority}
      default: 
          return state
  }
  
}