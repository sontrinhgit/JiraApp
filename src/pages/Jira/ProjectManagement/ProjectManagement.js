import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Space, Tag } from "antd";
import ReactHtmlParser from "react-html-parser";
import { useSelector, useDispatch } from "react-redux";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import FormEditProject from "../../../components/Forms/FormEditProject/FormEditProject";
import { Popconfirm, message } from "antd";
import { Avatar, Image } from "antd";
import { Popover } from "antd";
import { AutoComplete } from "antd";
import { NavLink } from "react-router-dom";


const confirm = (e) => {
  console.log(e);
  message.success("Click on Yes");
};

const cancel = (e) => {
  console.log(e);
  message.error("Click on No");
};

const ProjectManagement = (props) => {
  //Lay du lieu tu reducer ve component
  const projectList = useSelector(
    (state) => state.ProjectJiraReducer.projectList
  );

  //Lay gia tri cua UserSearch tu Reducer ve

  const listUserSearch = useSelector(
    (state) => state.UserJiraReducer.userSearch
  );

  //su dung dispatch de goi action
  const dispatch = useDispatch();

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  useEffect(() => {
    //dispatch dung voi cai ten cua Saga de no goi vao dung vao ham SAGA do
    dispatch({ type: "GET_LIST_PROJECT_SAGA" });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };


  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};

  const [value, setValue] = useState("");

  const searchRef = useRef(null);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
      sortDirections: ["descend"],
    },
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
      render: (text,record, index) => {
        return <NavLink to={`/detail/${record.id}`}>{text}</NavLink>
      },
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName.trim().toLowerCase(); //bien tat ca thanh chu thuong va loai bo khoang trong
        let projectName2 = item2.projectName.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend"], //sort tu duoi len tren, mac dinh thi se sort tu tren xuong duoi
    },

    {
      title: "categoryName",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (item2, item1) => {
        let category1 = item1.categoryName.trim().toLowerCase();
        let category2 = item2.categoryName.trim().toLowerCase();
        if (category2 < category1) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend"],
    },

    {
      title: "creator",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
    },

    {
      title: "members",
      key: "members",
      render: (text, record, index) => {
        return (
        
          <div>
            
            {record.members?.slice(0, 3).map((item, index) => {
              return (
                <Popover placement="top" title="member" trigger="hover" content = {() =>{
                  
                 return <table className='table'>
                   <thead>
                     <tr>
                       <th>Id</th>
                       <th>Avatar</th>
                       <th>Name</th>
                     </tr>
                   </thead>
                   <tbody>
                     {record.members?.map((item,index) => {
                       return <tr key={index}>
                         <td>{item.userId}</td>
                         <td><img src={item.avatar} width='30' height='30' ></img></td>
                         <td>{item.name}</td>
                         <td>
                           <button className="btn btn-danger" onClick={()=>{
                             dispatch({
                               type: 'DELETE_USER_PROJECT_SAGA',
                               userProject: {
                                "projectId": record.id,
                                "userId": item.userId
                               }
                             })
                           }}>Delete</button>
                         </td>
                       </tr>
                     })}
                   </tbody>
                 </table>
                }}>
                  <Avatar key={index} src={item.avatar}></Avatar>
                </Popover>
              )
            })}

            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}

            <Popover
              placement="rightTop"
              title={"Add user"}
              content={() => {
                return (
                  <AutoComplete
                    style={{ width: 100 }}
                    placeholder="input here"
                    options={listUserSearch?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                        key: index,
                      };
                    })}
                    value={value}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    onSelect={(valueSelect, option) => {
                      //Xet gia tri cua hop thoai bang option.label
                      setValue(option.label);

                      //goi Api gui ve backend
                      dispatch({
                        type: "ADD_USER_SAGA",
                        userProject: {
                          projectId: record.id,
                          userId: valueSelect,
                        },
                      });
                    }}
                    onSearch={(value) => {
                      //debounce search 
                      //doi 300s roi moi dispatch de search
                      //lay gia tri sau khi nguoi dung k nhap nua, sau 300s, nguoi dung nhap lien tiep thi se dispatch len, con k nhap sau 300s thi se lay gia tri cuoi cung 
                      
                      //luc dau gia tri la null ==> clearTimeoUt => k dispatch gi ca
                      //khi co gia tri thi se set Timeout, sau 300s se dispatch len SAGA
                      if(searchRef.current ) {
                        clearTimeout(searchRef.current)
                      }
                      searchRef.current = setTimeout(()=>{
                        dispatch ({
                          type: "GET_USER_SAGA",
                        keyWord: value,
                        })
                      }, 300)
                      
                    }}
                  />
                );
              }}
              trigger="click"
            >
              <Button>+</Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            className="btn btn-success"
            onClick={() => {
              const action = {
                type: "OPEN_FORM_EDIT_PROJECT",
                Component: <FormEditProject />,
                title: 'Edit Project Jira'
              };
              //dispatch noi dung len reducer
              dispatch(action);

              //dispatch du lieu dong hien tai len reducer (ProjectEditReducer), gia tri record lay tu render chinh la du lieu hien tai
              const actionEditProject = {
                type: "EDIT_PROJECT",
                projectEditModel: record,
              };

              dispatch(actionEditProject);
            }}
          >
            <EditFilled></EditFilled>
          </Button>
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => {
              dispatch({
                type: "DELETE_PROJECT_SAGA",
                idProject: record.id,
              });
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button className="btn btn-danger">
              <DeleteFilled />
            </Button>
          </Popconfirm>
          ,
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <div>
        <h3>Project Management</h3>
      </div>
     
      <Table
        rowKey={""}
        columns={columns}
        dataSource={projectList}
        onChange={handleChange}
      />
    </div>
  );
};

export default ProjectManagement;
