import {} from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import reduxThunk from 'redux-thunk'
import {HistoryReducer} from './reducers/HistoryReducer'
import {UserJiraReducer} from './reducers/UserJiraReducer'

import {LoadingReducer} from './reducers/LoadingReducer'
//middleware Saga
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from './sagas/rootSaga';
import { ProjectCategoryReducer } from './reducers/ProjectCategoryReducer';
import { ProjectJiraReducer } from './reducers/ProjectJiraReducer';
import { DrawerReducer } from './reducers/DrawerReducer';
import { ProjectEditReducer } from './reducers/ProjectEditReducer';
import { TaskTypeReducer } from './reducers/TaskTypeReducer';
import { PriorityReducer } from './reducers/PriorityReducer';
import { StatusReducer } from './reducers/StatusReducer';

const middleWareSaga = createMiddleWareSaga();
//Truyen vao middleWareSaga mot generator function 

//Link tat ca cac reducer vao day de moi reducer link voi tong application
const rootReducer = combineReducers({

    HistoryReducer,
    UserJiraReducer,
    LoadingReducer,
    ProjectCategoryReducer,
    ProjectJiraReducer,
    DrawerReducer,
    ProjectEditReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusReducer
})

const store = createStore(rootReducer,applyMiddleware(reduxThunk,middleWareSaga));

//Gan middleWareSaga vao store roi moi goi Saga
middleWareSaga.run(rootSaga)

export default store;
