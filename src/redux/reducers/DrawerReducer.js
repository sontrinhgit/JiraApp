import React from "react";
//Nhung cai gi hay thay doi se de het vao gia tri initialState  
const initialState = {
  visible: false,
  //mac dinh la cai drawer se dong, nhan prop tu DrawerJira

  title: '',
  ComponentContentDrawer: <p>default</p>,
  callBackSubmit: (propsValue) => {
      alert('click demo')
  }
};

export const DrawerReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "OPEN_DRAWER": {
       state.visible = true;
      return { ...state };
    }
        
    case "CLOSE_DRAWER": {
        state.visible = false;
        return {...state}
    }

    case "OPEN_FORM_EDIT_PROJECT" : {
        return {...state, visible: true, ComponentContentDrawer: action.Component, title: action.title }
    }
    case "SET_SUBMIT_EDIT_PROJECT": {
        state.callBackSubmit = action.submitFunction;
        return {...state};
    }

    case "OPEN_FORM_NEW_TASK" : {
      state.visible = true;
      state.ComponentContentDrawer = action.ComponentContentDrawer;
      state.title = action.title;
      return {...state}
    }
    default:
      return state;
  }
};
