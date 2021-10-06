import axios from "axios";
import {
  call,
  delay,
  fork,
  take,
  takeEvery,
  put,
  takeLatest,
  select,
} from "redux-saga/effects";
import {
  USER_SIGNIN_API,
  USLOGIN,
} from "../../constant/JiraConstant/JiraConst";
import { JiraService } from "../../../services/JiraService";
import { TOKEN, USER_LOGIN } from "../../../utils/constant/settingSystem";
import { history } from "../../../utils/libs/history";
//Control action in saga';
import { DISPLAY_LOADING } from "../../constant/JiraConstant/LoadingConst";
import { UserService } from "../../../services/UserService";

function* singinJira(action) {
  console.log(action);
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    const { data, status, message } = yield call(() =>
      JiraService.signinJira(action.userLogin)
    ); // chung ta co the thuc nhieu buoc truoc khi tra ve ket qua, nen ta can dung yield call(), voi logic can nhieu hon mot promise ta nen goi call thi se de hon

    //Luu vao localstore
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: USLOGIN,
      userLogin: data.content,
    });

    //React router to push this page to home page
    let history = yield select((state) => state.HistoryReducer.history);

    history.push("/jirabugs");
  } catch (err) {
    console.log(err.response.data.message);
    alert(err.response.data.message);
  }
}

export function* theoDoiSignIn() {
  yield takeLatest(USER_SIGNIN_API, singinJira);
}

//get user
function* getUserJira(action) {
  try {
    const { data, status } = yield call(() =>
      UserService.getUser(action.keyWord)
    ); // chung ta co the thuc nhieu buoc truoc khi tra ve ket qua, nen ta can dung yield call(), voi logic can nhieu hon mot promise ta nen goi call thi se de hon

    console.log("data", data);

    //put gia tri search goi ve tu api len redux de luu tru du lieu

    yield put({
      type: "GET_USER_SEARCH",
      userSearch: data.content,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiGetUser() {
  yield takeLatest("GET_USER_SAGA", getUserJira);
}

//add user project

function* addUserProject(action) {
  try {
    const { data, status } = yield call(() =>
      UserService.assignUser(action.userProject)
    ); // chung ta co the thuc nhieu buoc truoc khi tra ve ket qua, nen ta can dung yield call(), voi logic can nhieu hon mot promise ta nen goi call thi se de hon

    //goi lai projectList de load lai project list
    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });

    //put gia tri search goi ve tu api len redux de luu tru du lieu
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiAddUser() {
  yield takeLatest("ADD_USER_SAGA", addUserProject);
}

function* deleteUserProject(action) {
  try {
    const { data, status } = yield call(() =>
      UserService.deleteUserFromProject(action.userProject)
    ); // chung ta co the thuc nhieu buoc truoc khi tra ve ket qua, nen ta can dung yield call(), voi logic can nhieu hon mot promise ta nen goi call thi se de hon

    //goi lai projectList de load lai project list
    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });

    //put gia tri search goi ve tu api len redux de luu tru du lieu
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiDeleteUserProject() {
  yield takeLatest("DELETE_USER_PROJECT_SAGA", deleteUserProject);
}
