import { all, call } from "@redux-saga/core/effects";

import * as Jira from './Jira/UserJira'
import * as ProjectCategory from './Jira/ProjectCategorySaga'
import * as ProjectSaga from './Jira/CreateProjectSaga'
import * as TaskTypeSaga from './Jira/TaskTypeSaga'
import * as PrioritySaga from './Jira/PrioritySaga'
export function * rootSaga () {
    
    yield all([
        //all thi nhan vao mot mang gom cac function saga
     
        //Jira theo signIn
        Jira.theoDoiSignIn(),
        Jira.theoDoiGetUser(),
        Jira.theoDoiAddUser(),
        Jira.theoDoiDeleteUserProject(),
    
        
        //ProjectCategory theo ProjectCategorySaga
       ProjectCategory.theoDoiGetAllProjectCategory(),
       ProjectSaga.theoDoiCreateProjectSaga(),
       ProjectSaga.theoDoiGetListProjectSaga(),
       ProjectSaga.theoDoiUpdateProjectSaga(),
       ProjectSaga.theoDoiDeleteProjectSaga(),
       ProjectSaga.theoDoiGetProjectDetail(),
       ProjectSaga.theoDoiGetAllProject(),

       TaskTypeSaga.theoDoigetTaskType(),
       TaskTypeSaga.theoDoiCreateNewTask(),

       PrioritySaga.theoDoiGetPrioritySaga(),


       
    ])

}
