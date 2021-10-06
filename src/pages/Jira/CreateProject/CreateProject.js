import React, {useEffect} from "react";
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from "formik";
import * as Yup from "yup";
import {connect,  useDispatch, useSelector } from "react-redux";
const CreateProject = (props) => {

    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory)
    const dispatch = useDispatch();
    const { values, touched, errors, handleChange, handleBlur,setFieldValue, handleSubmit } =
    props;

    const handleEditorChange = (content, editor) => {
    setFieldValue('description', content)
    }

    useEffect(()=> {
        dispatch(
            {
                type: 'GET_ALL_PROJECT_CATEGORY_SAGA',
            }
        )
    }, [])

  return (
    <div className="container">
      <div className="text-center">Create Project</div>
      <form className="container" onSubmit={handleSubmit} onChange={handleChange}>
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" name="projectName"></input>
        </div>
        <div className="form-group">
          <p>Description</p>

          <Editor
           name = "description"
            initialValue="<p>This is the initial content of the editor.</p>"
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
            onEditorChange = {handleEditorChange}
          />
        </div>
        <div className="form-group">
          <select name="categoryId" className="form-control" onChange={handleChange}>
            {arrProjectCategory.map((item,index) => {
                return <option value={item.id} key={index}>{item.projectCategoryName}</option>
            })}
          </select>
        </div>
        <button className="btn btn-outline-primary" type="submit" >
          {" "}
          Create Project
        </button>
      </form>
    </div>
  );
};

const CreateProjectFrom = withFormik({
  enableReinitialize: true, //ham nay sinh ra de moi khi redux co thay doi thi se binding lai gia tri cho object ben duoi 
    mapPropsToValues: (props) => {
    console.log('propsValue', props) //lay gia tri luc dau ve thi state nay tren redux se la rong vi chua duoc cap nhat !!!
      return {
        projectName: '',
        description: '',
        categoryId: props.arrProjectCategory[0]?.id, //ta phai dung optional changing ? vi luc dau tren redux state nay k co gia tri, no se tra ve gia tri neu id co gia tri con k se tr a ve undefined neu k co gt
        //ham nay chi chay 1 lan chu k chay lai khi co thay doi tu redux 
      }
     
    },
  
    // Custom sync validation
    validationSchema: Yup.object().shape({
     
    }),
  
    handleSubmit: (values, {props, setSubmitting }) => {
      props.dispatch({
        type: 'CREATE_PROJECT_SAGA',
        newProject: values
      })
      // dispatch action len saga 
    },
  
    displayName: "BasicForm",
  })(CreateProject);

  const mapStateToProps = (state) => (
    {
      arrProjectCategory : state.ProjectCategoryReducer.arrProjectCategory
    }
    
  )

export default connect(mapStateToProps)(CreateProjectFrom) ;
