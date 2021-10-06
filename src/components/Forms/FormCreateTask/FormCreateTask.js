import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Select, Radio } from "antd";
import { Slider } from "antd";
import { useSelector, useDispatch, connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import { StatusReducer } from '../../../redux/reducers/StatusReducer';

const FormCreateTask = (props) => {

//lay du lieu ve tu redux 
const {arrProject} = useSelector(state=> state.ProjectJiraReducer)

const {arrTaskType} = useSelector(state => state.TaskTypeReducer) 

const {arrPriority} = useSelector(state => state.PriorityReducer)

const {userSearch} = useSelector (state => state.UserJiraReducer)

const {arrStatus} = useSelector ( state => state. StatusReducer)

console.log(arrStatus)

const {
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
  handleSubmit,
} = props; //cac props cua Formik de lay duoc gia tri value tu phia duoi roi in cac value do vao cac input
//Do ket noi voi Formik => component co cac props 



//Ham bien doi option cho the select
const userOption = userSearch.map((item,index) => {

  return {value: item.userId, label: item.name }
})


const dispatch = useDispatch();

useEffect(()=> {
    // eslint-disable-next-line no-unused-expressions
    dispatch({
        type: 'GET_ALL_PROJECT_SAGA',
      
    });
    dispatch({
        type: 'GET_TASK_TYPE_SAGA'
    });
    dispatch({
      type: 'GET_PRIORITY_SAGA'
    });
    dispatch({
      type: 'GET_USER_SAGA',
      keyWord: ''
    }) ;
    dispatch({
      type: 'GET_ALL_STATUS_SAGA',
    })
    
},[])


  

  const { Option } = Select;

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  

  const [size, setSize] = React.useState("default");

  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 5,
    timeTrackingRemaining: 20,
  });

  //onChange se dua vao name ma minh dat cho input => name do nen trung voi du lieu tu api gui ve 


  return (
    
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <p>Project</p>
        
        <select name="projectId" className="form-control" onChange={handleChange} >  
          {arrProject.map((project,index) => {
              return <option key={index}  value={project.id}>{project.projectName}</option>
          })}
        </select>
      </div>
      <div className="form-group">
        <p>Task Name</p>
        
        <input name = "taskName" className="form-control" onChange={handleChange}></input>
      </div>
      <div className="form-group">
        <p>Status</p>
        
        <select name = "statusId" className="form-control" onChange={handleChange}></select>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Priority</p>
            <select name="priorityId" className="form-control" onChange={handleChange}>
              {arrPriority.map((item,index) => {
                return <option key={index} value={item.priorityId}> {item.description}</option>
              })}
            </select>
          </div>
          <div className="col-6">
            <p>Task type</p>
            <select name="typeId" className="form-control" onChange={handleChange}>
              {arrTaskType.map((taskType,index) => {
                  return <option key={index} value={taskType.id}>{taskType.taskType}</option>
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Assignees</p>
            <Select
              mode="multiple"
              size={size}
              placeholder="Please select"
            
              options={userOption}
              optionFilterProp='label'
  
              onSearch={(value) => { 
                console.log('value', value)
                dispatch({
                  type: 'GET_USER_SAGA',
                  keyWord: ''
                }) 
            }}
            onSelect={value => console.log(value)}
              style={{ width: "100%" }}
            >
              {children}
            </Select>
          </div>

          <div className="col-6">
            <p>Time Tracking</p>
            <Slider
              value={timeTracking.timeTrackingSpent}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
            />
            <div className="row">
              <div className="col-6 text-left font-weight-bold">
                {timeTracking.timeTrackingSpent}h logged
              </div>
              <div className="col-6 text-left font-weight-bold">
                {timeTracking.timeTrackingRemaining}h remaining
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <input

                  type="number"
                  min="0"
                  className="form-control mt-2"
                  placeholder="Time spent"
                  name="timeTrackingSpent"
                  onChange={(e) => {
                    setTimeTracking({
                      ///nhap time Spent thi van lay duoc state cu time remaining
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                    setFieldValue('timeTrackingSpent', e.target.value);

                  }}
                ></input>
              </div>
              <div className="col-6">
                <input
                  type="number"
                  min="0"
                  className="form-control mt-2"
                  placeholder="Time remain"
                  name="timeTrackingRemaining"
                  onChange={(e) => {
                    setTimeTracking({
                      //do object phai co 2 thuoc tinh nen phai goi lai gia tri state cu
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                    setFieldValue('timeTrackingRemaining', e.target.value);
                  }}
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p>Original estimate</p>
            <input
              type="number"
              className="form-control"
              min="0"
              width="500"
              defaultValue="0"
              name="originalEstimate"
              onChange={handleChange}
            ></input>
          </div>
        </div>
      </div>
      <div className="form-group">
        <p className="font-weight-bold">Description</p>
        <Editor
          name="description"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={(content,editor) => {
            setFieldValue('description', content)
          }}
        />
      </div>
      <button type="submit">Submit </button>
    </form>
  );
};

const formCreateTask = withFormik({
  enableReinitialize: true, //ham nay sinh ra de moi khi redux co thay doi thi se binding lai gia tri cho object ben duoi
  mapPropsToValues: (props) => {
    
    return {
      taskName: '',
      description:'',
      statusId: '',
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId:0,
      typeId: 0,
      priorityId: 0,
    };
  },

  // Custom sync validation
  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: 'CREATE_TASK_SAGA',
      newTask: values
    })
    console.log('newTask', values)
  },

  displayName: "CreateTaskForm",
})(FormCreateTask);



export default connect() (formCreateTask);






