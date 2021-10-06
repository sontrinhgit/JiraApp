import { call, put, takeLatest } from "redux-saga/effects";
import { JiraService } from "../../../services/JiraService";
import { STATUS_CODE } from "../../../utils/constant/settingSystem";

function * getAllProjectCategorySaga () {
    try {
        const {data, status} = yield call(() => JiraService.getProjectCategory())

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'GET_ALL_PROJECT_CATEGORY',
                data: data.content,
            }) // lay data nay dua len reducer => cap nhat lai state 
        
            console.log('data', data) 
        }
    }
    catch(err) {
        console.log(err)
    }
   
}

export function * theoDoiGetAllProjectCategory () {
    yield takeLatest('GET_ALL_PROJECT_CATEGORY_SAGA',getAllProjectCategorySaga )
}