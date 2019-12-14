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
import { eventActions, uiActions, userActions } from "stores/actions";
import { SelectField } from "../SelectField";
import { history } from "../../helpers";

class TopNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersOpened: false
    };
  }

  componentDidMount() {
    const { getLocations, getTypes } = this.props;
    getLocations();
    getTypes();
  }

  render() {
    const { user, logout, locations, eventTypes, searchEvent } = this.props;

    const locationsOptions =
      locations &&
      locations.map(item => {
        return { value: item.slug, label: item.name };
      });
    const typesOptions =
      eventTypes &&
      eventTypes.map(item => {
        return { value: item.name, label: item.name };
      });

    return (
      <>
        <Formik
          initialValues={{
            name: "",
            date: "",
            city_id: "",
            event_type: "",
            entry_fee: ""
          }}
          onSubmit={(values, { setSubmitting }) => {
            this.setState({ filtersOpened: false });
            searchEvent(values);
            setSubmitting(false);
            setTimeout(() => {
              history.push("/listView");
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
                    {user.admin &&
                    <Link to="../admin" className="btn btn-secondary">
                      <FontAwesomeIcon icon={faCrown} />
                    </Link>}
                    <ModalAddEvent
                      locations={locations}
                      eventTypes={eventTypes}
                    />
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
                        name="event_type"
                        component={SelectField}
                        options={typesOptions}
                        field={{
                          name: "event_type",
                          value: values.event_type
                        }}
                        className={"form-control"}
                      />
                    </div>
                  </div>
                  <div className={"col-sm-4 col-md-3"}>
                    <div className="form-group">
                      <label htmlFor="id">Location</label>
                      <Field
                        name="city_id"
                        component={SelectField}
                        options={locationsOptions}
                        field={{
                          name: "city_id",
                          value: values.city_id
                        }}
                        className={"form-control"}
                      />
                    </div>
                  </div>
                  <div className={"col-sm-4 col-md-3"}>
                    <div className="form-group">
                      <label htmlFor="id">Date</label>
                      <DatePicker
                        type="date"
                        name="date"
                        className={"form-control"}
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
                        name="entry_fee"
                        id={"entry_fee"}
                        className={"form-control"}
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
  const { locations, eventTypes } = state.ui;
  return { user, locations, eventTypes };
};

const actionCreators = {
  logout: userActions.logout,
  getLocations: uiActions.getLocations,
  getTypes: uiActions.getEventTypes,
  searchEvent: eventActions.searchEvent
};

const connectedLoginPage = connect(
  mapStateToProps,
  actionCreators
)(TopNavigation);
export { connectedLoginPage as TopNavigation };
