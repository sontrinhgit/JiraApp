import React, { useState } from "react";

const initialState = {
  projectEdit: {
    "id": 1,
    "projectName": "test",
    "creator": 0,
    "description": "test",
    "categoryId": "2",
  },
};

export const ProjectEditReducer = (state = initialState, action) => {
    switch(action.type){
      case 'EDIT_PROJECT' : {
        state.projectEdit = action.projectEditModel;
        return {...state}
      }
    default: 
        return state
    }
};
