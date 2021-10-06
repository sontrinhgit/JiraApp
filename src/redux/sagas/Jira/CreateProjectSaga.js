import { notification } from "antd";
import { call, delay, put, takeLatest, takeLeading } from "redux-saga/effects";
import { JiraService } from "../../../services/JiraService";
import { projectService } from "../../../services/ProjectService";
import { STATUS_CODE } from "../../../utils/constant/settingSystem";
import { history } from "../../../utils/libs/history";
import { notifiFunction } from "../../../utils/Notification/NotificationJira";
import { DISPLAY_LOADING } from "../../constant/JiraConstant/LoadingConst";

function * createProjectSaga(action) {

    try {
        const {data, status} = yield call(() => 
            JiraService.createProjectAuthorization(action.newProject)
        )
        
        if (status === STATUS_CODE.SUCCESS){
            console.log(data);
        }
       
    }
    catch (err) {
        console.log(err);
    }
   
}

export function * theoDoiCreateProjectSaga () {
    yield takeLatest ('CREATE_PROJECT_SAGA',createProjectSaga); //dispatch len thi dau tien se chay vao day, lang nghe dua theo type dispatch len, sau do se tim ham createprojectSaga de xu ly du lieu 
}


function * getListProjectSaga(action){
    try{
        const {data, status} = yield call (() => 
            JiraService.getListProject()
        )

        if (status === STATUS_CODE.SUCCESS){
            //put gia tri nhan tu service ve len reducers bang mot action 
           yield put ({
                type: 'GET_LIST_PROJECT',
                projectList: data.content,
           })
        }
    }catch(err){
        console.log(err);
    }
}

export function * theoDoiGetListProjectSaga() {
    yield takeLatest('GET_LIST_PROJECT_SAGA', getListProjectSaga)
}


//Update project


function * updateProjectSaga(action){
    yield put ({
        type: DISPLAY_LOADING
    })
   yield delay (500);
    
    try{
        const {data, status} = yield call (() => 
            JiraService.updateProject(action.projectUpdate)
        )

        if (status === STATUS_CODE.SUCCESS){
            //put gia tri nhan tu service ve len reducers bang mot action 
           console.log(data);
           notifiFunction('success', 'Updated project successfully!')
        }
        //goi lai get list project SAGA
        yield put ({
            type: 'GET_LIST_PROJECT_SAGA' 
        })
        //giong nhu dispatch o tren redux 

        yield put ({
            type: 'CLOSE_DRAWER'
        })

    }catch(err){
        console.log(err);
    }
}

export function * theoDoiUpdateProjectSaga() {
    yield takeLatest('UPDATE_PROJECT_SAGA', updateProjectSaga)
}

//Delete

function * deleteProjectSaga(action){
    yield put ({
        type: DISPLAY_LOADING
    })
   yield delay (500);
    
    try{
        const {data, status} = yield call (() => 
            JiraService.deleteProject(action.idProject)
        )

        if (status === STATUS_CODE.SUCCESS){
            //put gia tri nhan tu service ve len reducers bang mot action 
           console.log(data)
           notifiFunction('success','Delete project successfully!')
        }
        //goi lai get list project SAGA
        yield put ({
            type: 'GET_LIST_PROJECT_SAGA' 
        })
        //giong nhu dispatch o tren redux 

        yield put ({
            type: 'CLOSE_DRAWER'
        })

    }catch(err){
        console.log(err);
    }
}

export function * theoDoiDeleteProjectSaga() {
    yield takeLatest('DELETE_PROJECT_SAGA', deleteProjectSaga)
}

function * getProjectDetail(action){
  
    
    try{
        const {data, status} = yield call (() => 
            JiraService.getProjectDetail(action.id)
        )

        console.log('data', data)

       yield put ({
           type: 'PUT_PROJECT_DETAIL',
           projectDetail: data.content,
       })
        

    }catch(err){
        console.log('404 not found');
        history.push('/projectManagement')
    }
}

export function * theoDoiGetProjectDetail() {
    yield takeLatest('GET_PROJECT_DETAIL', getProjectDetail)
}



function * getAllProjectSaga(action){
  
    
    try{
        const {data, status} = yield call (() => 
            JiraService.getListProject()
        )

       

       yield put ({
           type: 'GET_ALL_PROJECT',
           arrProject: data.content,
       })
        

    }catch(err){
        console.log('404 not found');
        
    }
}

export function * theoDoiGetAllProject() {
    yield takeLatest('GET_ALL_PROJECT_SAGA', getAllProjectSaga)
}