import { call, put, takeLatest } from "redux-saga/effects";
import { JiraService } from "../../../services/JiraService";
import { STATUS_CODE } from "../../../utils/constant/settingSystem";

function * getAllStatusSaga () {
    try {
        const {data, status} = yield call(() => JiraService.getAllStatus())
        yield put ({
            type: 'GET_ALL_STATUS',
            arrStatus: data.content,
        })
    }
    catch(err) {
        console.log(err)
    }
   
}

export function * theDoiGetAllStatus () {
    yield takeLatest('GET_ALL_STATUS_SAGA',getAllStatusSaga )
}