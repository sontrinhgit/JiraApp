import React from "react";

const HeaderMain = (props) => {
  return (
    <div className="header">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
          <li className="breadcrumb-item">Project</li>
          <li className="breadcrumb-item">Jira</li>
          <li className="breadcrumb-item">Project Management</li>
          <li className="breadcrumb-item active" aria-current="page">
            {props.projectDetail.projectName}
          </li>
        </ol>
      </nav>
    </div>
  );
}
export default HeaderMain;
