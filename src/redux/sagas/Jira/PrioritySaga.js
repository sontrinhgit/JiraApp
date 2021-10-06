import { call, put, takeLatest } from "redux-saga/effects";
import { PriorityService } from "../../../services/PriorityService";

function * getPrioritySaga(action) {
    try  {
        const {data, status} = yield call (() => PriorityService.getPriority())

        yield put ({
            type: 'GET_PRIORITY_REDUCER',
            arrPriority: data.content
            //du lieu nam torng content nen ta . content
        })
    } catch (err) {
        console.log(err)
    }
}

export function * theoDoiGetPrioritySaga() {
    yield takeLatest ('GET_PRIORITY_SAGA', getPrioritySaga)
}