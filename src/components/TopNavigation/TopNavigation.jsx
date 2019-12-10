import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCrown,
  faFilter,
  faList,
  faSearch,
  faSignOutAlt,
  faUserAlt
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./TopNavigation.scss";
import ModalSignIn from "../ModalSignIn/ModalSignIn";
import { Field, Formik } from "formik";
import DatePicker from "react-datepicker";
import ModalAddEvent from "../ModalAddEvent/ModalAddEvent";
import { connect } from "react-redux";
import { userActions } from "stores/actions";

class TopNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersOpened: false
    };
  }

  render() {
    const { user, logout } = this.props;
    console.log("user", user);
    return (
      <>
        <Formik
          initialValues={{
            name: "",
            date: "",
            location: "",
            type: "",
            entryFee: ""
          }}
          onSubmit={(values, { setSubmitting }) => {
            this.setState({ filtersOpened: false });
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ values, setFieldValue, handleSubmit, resetForm }) => (
            <form onSubmit={handleSubmit}>
              <div className="input-group navigation-group top-left">
                <Field
                  type="text"
                  name="name"
                  id={"name"}
                  className={"form-control"}
                  placeholder="Enter name"
                />
                <div className="input-group-append">
                  <button className="btn btn-secondary" type="submit">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => {
                      this.setState({
                        filtersOpened: !this.state.filtersOpened
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faFilter} />
                  </button>
                  <Link
                    to={this.props.isListView ? "" : "../listView"}
                    className={
                      "btn btn-secondary rounded-right " +
                      (this.props.isListView ? "active" : "")
                    }
                  >
                    <FontAwesomeIcon icon={faList} />
                  </Link>
                </div>
              </div>
              <div className="navigation-group top-right">
                {user && (
                  <div className="btn-group">
                    <Link to="../admin" className="btn btn-secondary">
                      <FontAwesomeIcon icon={faCrown} />
                    </Link>
                    <ModalAddEvent />
                    <Link to="../profile" className="btn btn-secondary">
                      <FontAwesomeIcon icon={faUserAlt} />
                    </Link>
                    <div
                      onClick={() => logout()}
                      className="btn btn-secondary rounded-right"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} />
                    </div>
                  </div>
                )}

                {!user && <ModalSignIn />}
              </div>

              <div
                className={
                  "search-criteria " +
                  (!this.state.filtersOpened ? "hidden" : "")
                }
              >
                <div className={"form-row"}>
                  <div className={"col-sm-4 col-md-3"}>
                    <div className="form-group">
                      <label htmlFor="id">Type</label>
                      <Field
                        type="text"
                        name="type"
                        id={"type"}
                        className={"form-control form-control-sm"}
                        placeholder="Enter type"
                      />
                    </div>
                  </div>
                  <div className={"col-sm-4 col-md-3"}>
                    <div className="form-group">
                      <label htmlFor="id">Location</label>
                      <Field
                        type="text"
                        name="location"
                        id={"location"}
                        className={"form-control form-control-sm"}
                        placeholder="Enter location"
                      />
                    </div>
                  </div>
                  <div className={"col-sm-4 col-md-3"}>
                    <div className="form-group">
                      <label htmlFor="id">Date</label>
                      <DatePicker
                        type="date"
                        name="date"
                        className={"form-control form-control-sm"}
                        selected={values.date}
                        id={"formDate"}
                        onChange={date => {
                          setFieldValue("date", date);
                        }}
                        value={values.date}
                      />
                    </div>
                  </div>
                  <div className={"col-sm-4 col-md-3"}>
                    <div className="form-group">
                      <label htmlFor="id">Entry fee</label>
                      <Field
                        type="text"
                        name="entryFee"
                        id={"entryFee"}
                        className={"form-control form-control-sm"}
                        placeholder="Enter entry fee"
                      />
                    </div>
                  </div>
                  <div className={"col-12 text-right"}>
                    <button
                      type="button"
                      className={"btn btn-primary"}
                      onClick={() => {
                        resetForm({});
                      }}
                    >
                      Reset filters
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { user = null } = state.authentication || {};
  return { user };
};

const actionCreators = {
  logout: userActions.logout
};

const connectedLoginPage = connect(
  mapStateToProps,
  actionCreators
)(TopNavigation);
export { connectedLoginPage as TopNavigation };
