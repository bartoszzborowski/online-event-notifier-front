import React from "react";
import { TopNavigation } from "../../components/TopNavigation";
import "./AdminPage.scss";
import { faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export class AdminPage extends React.Component {
  render() {
    return (
      <>
        <TopNavigation />
        <div className={"container-fluid"}>
          <div className={"row"} style={{ marginTop: "5rem" }}>
            <div className={"col-12"}>
              <div className={"card"}>
                <div className={"card-header"}>Admin panel</div>
                <div className={"card-body"}>
                  <div className={"form-row"}>
                    <Link to="./admin/events" className={"col-auto tile"}>
                      <div className="content">
                        <div className="icon">
                          <FontAwesomeIcon icon={faCalendar} />
                        </div>
                        <div className="header">
                          <span>{"Events"}</span>
                        </div>
                      </div>
                    </Link>

                    <Link to="./admin/users" className="col-auto tile">
                      <div className="content">
                        <div className="icon">
                          <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div className="header">
                          <span>{"Users"}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
