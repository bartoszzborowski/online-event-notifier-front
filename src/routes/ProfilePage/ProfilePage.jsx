import React from "react";
import { ErrorMessage, Field, Formik } from "formik";
import { TopNavigation } from "../../components/TopNavigation";
import { EventListItem } from "../../components/EventListItem";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { eventActions } from "stores/actions";
import { userActions } from "../../stores/actions";
import Loader from "react-loader-spinner";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProfilePage.scss";
import Alert from "react-bootstrap/Alert";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAlert: false
    };
  }
  componentDidMount() {
    const { getEvents, getAllUserConst } = this.props;
    if (getAllUserConst) {
      getAllUserConst();
    }
    if (getEvents) {
      getEvents();
    }
  }

  render() {
    const { success } = this.state;
    const {
      updateUserConst,
      user,
      events,
      userEvents,
      loading,
      refreshUser
    } = this.props;
    return (
      <>
        <TopNavigation />
        <div className={"container-fluid"}>
          <div className={"row"} style={{ marginTop: "5rem" }}>
            <div className={"col-12"}>
              <div className={"card"}>
                <div className={"card-header"}>Profile</div>
                <div className={"card-body"}>
                  <div className={"form-row"}>
                    <div className={"col-sm-4"}>
                      <h5 className={"text-center"}>Account data</h5>
                      {success && (
                        <Alert
                          variant="success"
                          onClose={() => this.setState({ success: false })}
                          dismissible
                        >
                          <Alert.Heading>Oh yeah!</Alert.Heading>
                          <p>Your profile is successful updated</p>
                        </Alert>
                      )}
                      <hr />
                      <Formik
                        initialValues={{
                          email: user.email,
                          name: user.name,
                          surname: user.surname,
                          password: "",
                          confirmPassword: ""
                        }}
                        validate={values => {
                          const errors = {};
                          if (!values.name) {
                            errors.name =
                              "Name is either not provided or is invalid";
                          }
                          if (!values.surname) {
                            errors.surname =
                              "Surname is either not provided or is invalid";
                          }
                          if (values.password !== values.confirmPassword) {
                            errors.confirmPassword =
                              "confirm password is not like password";
                          }
                          return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                          values.id = user.id;
                          if (!values.password) {
                            delete values.password;
                            delete values.confirmPassword;
                          }
                          updateUserConst(values).then(() => {
                            refreshUser();
                            this.setState({ success: true });
                          });
                          setSubmitting(false);
                        }}
                      >
                        {({ errors, handleSubmit }) => (
                          <form onSubmit={handleSubmit}>
                            <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <Field
                                type="email"
                                name="email"
                                id={"email"}
                                className={
                                  "form-control " +
                                  (errors.email ? "is-invalid" : "")
                                }
                                placeholder="Enter email"
                                disabled
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className={"invalid-feedback"}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="name">Name</label>
                              <Field
                                type="text"
                                name="name"
                                id={"name"}
                                className={
                                  "form-control " +
                                  (errors.name ? "is-invalid" : "")
                                }
                                placeholder="Enter name"
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className={"invalid-feedback"}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="name">Surname</label>
                              <Field
                                type="text"
                                name="surname"
                                id={"surname"}
                                className={
                                  "form-control " +
                                  (errors.surname ? "is-invalid" : "")
                                }
                                placeholder="Enter surname"
                              />
                              <ErrorMessage
                                name="surname"
                                component="div"
                                className={"invalid-feedback"}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="password">Password</label>
                              <Field
                                type="password"
                                name="password"
                                id={"password"}
                                className={
                                  "form-control " +
                                  (errors.password ? "is-invalid" : "")
                                }
                                placeholder="Enter Password"
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className={"invalid-feedback"}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="confirmPassword">
                                Confirm password
                              </label>
                              <Field
                                type="password"
                                name="confirmPassword"
                                id={"confirmPassword"}
                                className={
                                  "form-control " +
                                  (errors.confirmPassword ? "is-invalid" : "")
                                }
                                placeholder="Confirm the password"
                              />
                              <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className={"invalid-feedback"}
                              />
                            </div>
                            <div className={"text-right"}>
                              <Button variant="secondary" className={"mr-2"}>
                                Reset
                              </Button>
                              <button
                                className={"btn btn-primary"}
                                type={"submit"}
                              >
                                Edit
                              </button>
                            </div>
                          </form>
                        )}
                      </Formik>
                    </div>
                    <div className={"col-sm-4"}>
                      <h5 className={"text-center"}>Events you attend</h5>
                      <hr />
                      {!userEvents && <div>Loading events....</div>}
                      {userEvents &&
                        userEvents.map((item, index) => {
                          return <EventListItem item={item} key={index} />;
                        })}
                      {(!userEvents || userEvents.length === 0) && (
                        <div>You are not attending any events yet</div>
                      )}
                    </div>
                    <div className={"col-sm-4"}>
                      <h5 className={"text-center"}>Events you've created</h5>
                      <hr />
                      {loading && (
                        <div className={"d-flex h-100 justify-content-center"}>
                          <Loader
                            type="Triangle"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            className={"mt-5"}
                          />
                        </div>
                      )}
                      {!loading &&
                        events &&
                        events.map((item, index) => {
                          return <EventListItem item={item} key={index} />;
                        })}
                      {!loading && (!events || events.length === 0) && (
                        <div className={"no-events text-center"}>
                          <div>
                            <FontAwesomeIcon icon={faBoxOpen} size={"6x"} />
                          </div>
                          <div className={"mt-2"}>
                            You haven't created any events yet
                          </div>
                        </div>
                      )}
                    </div>
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

const mapStateToProps = state => {
  const { user = null } = state.authentication || {};
  const { events, event, loading } = state.events;
  const { userEvents } = state.authentication;
  return { user, events, event, loading, userEvents };
};

const actionCreators = {
  getEvents: eventActions.getEvents,
  updateUserConst: userActions.updateUser,
  refreshUser: userActions.refreshUser
};

const connectedRegisterPage = connect(
  mapStateToProps,
  actionCreators
)(ProfilePage);

export { connectedRegisterPage as ProfilePage };
