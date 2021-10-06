import React from "react";
import {
  AVATAR_1,
  AVATAR_2,
  AVATAR_3,
} from "../../../utils/constant/settingSystem";
const ContentMain = (props) => {
  const { projectDetail } = props;

  console.log(projectDetail);

  const renderCard = () => {
    return projectDetail.lstTask?.map((item, index) => {
      return (
        <div className="card" style={{ width: "17rem", height: "25rem" }}>
          <div className="card-header" key={index}>
             {item.statusName}
          </div>
          <ul className="list-group list-group-flush">
            <li
              className="list-group-item"
              data-toggle="modal"
              data-target="#infoModal"
              style={{ cursor: "pointer" }}
            >
              <p>
                Each issue has a single reporter but can have multiple assignees
              </p>
              <div className="block" style={{ display: "flex" }}>
                <div className="block-left">
                  <i className="fa fa-bookmark" />
                  <i className="fa fa-arrow-up" />
                </div>
                <div className="block-right">
                  <div className="avatar-group" style={{ display: "flex" }}>
                    <div className="avatar">
                      <img src={AVATAR_1} alt="1" />
                    </div>
                    <div className="avatar">
                      <img src={AVATAR_2} alt="2" />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="content" style={{ display: "flex" }}>
      {renderCard()}
    </div>
  );
};

export default ContentMain;
