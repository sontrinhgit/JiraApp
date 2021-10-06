import { call, put, takeLatest } from "redux-saga/effects";
import { TaskTypeService } from "../../../services/TaskTypeService";
import { notifiFunction } from '../../../utils/Notification/NotificationJira';

function* getTaskTypeSaga(action) {
  try {
    const { data, status } = yield call(() => TaskTypeService.getTaskType());

    yield put({
      type: "GET_ALL_TASK_TYPE",
      arrTaskType: data.content,
      //du lieu nam torng content nen ta . content
    });
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoigetTaskType() {
  yield takeLatest("GET_TASK_TYPE_SAGA", getTaskTypeSaga);
}

function* createNewTask(action) {
  try {
    const { data, status } = yield call(() => TaskTypeService.createTask(action.newTask));
    yield put({
      type: "CLOSE_DRAWER",
    });
    notifiFunction('success', 'Create task successfully !')
    console.log(data)
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiCreateNewTask() {
  yield takeLatest("CREATE_TASK_SAGA", createNewTask);
}
