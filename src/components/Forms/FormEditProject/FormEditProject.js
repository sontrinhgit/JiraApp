import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { validateYupSchema, withFormik } from "formik";
import * as Yup from "yup";

const FormEditProject = (props) => {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "GET_ALL_PROJECT_CATEGORY_SAGA",
    });

    //dispatch len reducer de cap nhat gia tri cho submitFunction
    //load su kien submit len drawer nut submit
    //gui nut submit cua model cho EditFormik de nhan duoc gia tri handleSubmit 
    dispatch({
      type: "SET_SUBMIT_EDIT_PROJECT",
      submitFunction: handleSubmit,
    }); 
  }, []);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = props; //cac props cua Formik de lay duoc gia tri value tu phia duoi roi in cac value do vao cac input

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };



  return (
    <form className="container-fluid" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project id</p>
            <input
              value={values.id}
              disabled
              className="form-control"
              name="id"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project name</p>
            <input value={values.projectName} name="projectName" onChange={handleChange} />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <select name="categoryId" value={values.categoryId} onChange={handleChange}>
              {arrProjectCategory.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              name="description"
              initialValue={values.description}
              value={values.description}
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
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

const EditProjectForm = withFormik({
  enableReinitialize: true, //ham nay sinh ra de moi khi redux co thay doi thi se binding lai gia tri cho object ben duoi
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit?.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    };
  },

  // Custom sync validation
  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log('values',values)
    const action = {
      type: 'UPDATE_PROJECT_SAGA',
      projectUpdate: values,
    }
    //no co thuoc tinh dispatch vi duoc bao boc trong EditProjectForm 
    props.dispatch(action);
  },

  displayName: "BasicForm",
})(FormEditProject);

//muon lay gia tri nao ve tu redux thi lay tu day roi map len ca field gia tri
//Dung mapStateToProps chu k phai useSelector boi vi ta dua vao Formik chu k phai dua vao Component
//=>> Dua vao Component truc tiep thi k validate nhu the nay duoc
const mapStateToProps = (state) => ({
  projectEdit: state.ProjectEditReducer.projectEdit,
});

export default connect(mapStateToProps)(EditProjectForm);
