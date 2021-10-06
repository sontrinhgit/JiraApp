import React, { useEffect } from 'react';
import HeaderMain from '../../../components/Jira/Main/HeaderMain';
import InfoMain from '../../../components/Jira/Main/InfoMain';
import ContentMain from '../../../components/Jira/Main/ContentMain';
import ModalJira from '../../../components/Jira/ModalJira/ModalJira';
import { useDispatch, useSelector } from 'react-redux';
const IndexJira = (props) => {
    //props de nhan gia tri tu thang App.js, lay tham so id 

    const {projectDetail} = useSelector(state => state.ProjectJiraReducer);

    const dispatch = useDispatch();

    console.log('projectDetail',projectDetail)

    useEffect(() => {
        //khi nguoi dung link qua trang nay bang the NavLink hoac ng dung tu go url thi ta se lay tham so tu url => Goi saga 
        const {id} = props.match.params;
        dispatch({
            //goi api ve tu Saga
            type: 'GET_PROJECT_DETAIL',
            id,
        })
    },[])

    return (
        <div>
            <HeaderMain projectDetail = {projectDetail}/>
            <InfoMain members={projectDetail}/>
            <ContentMain projectDetail = {projectDetail} />
        </div>
      
    );
}

export default IndexJira;

