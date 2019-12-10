import React from "react";
import "./ListViewPage.scss";
import MapContainer from "../../components/MapContainer/MapContainer";
import { TopNavigation } from "../../components/TopNavigation/TopNavigation";
import { EventListItem } from "../../components/EventListItem/EventListItem";
import DatePicker from "react-datepicker";
import { ErrorMessage, Field, Formik } from "formik";
import ModalDeleteEvent from "../../components/ModalDeleteEvent/ModalDeleteEvent";
import { eventActions } from "stores/actions";
import { uiActions } from "stores/actions";
import { connect } from "react-redux";
import { SelectField } from "../../components/SelectField";
import Toast from "react-bootstrap/Toast";

class ListViewPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.editing = false;
    this.state = {
      showToast: false,
      event: {
        id: 1,
        name: "Some very very very very very very long name",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem elit, pretium ut imperdiet vel, semper vestibulum quam. Phasellus rhoncus dolor libero, non sollicitudin elit feugiat id. Aliquam orci metus, bibendum et dui in, porttitor convallis velit.",
        date: "2019-11-27T16:44:16+0000",
        location: "???",
        entryFee: 13.33
      }
    };
    this.editEvent = this.editEvent.bind(this);
    this.cancelEditEvent = this.cancelEditEvent.bind(this);
    this.toggleToast = this.toggleToast.bind(this);
  }

  componentDidMount() {
    const { getByUser, getLocations, getEventTypes } = this.props;
    getLocations();
    getEventTypes();
    if (getByUser) {
      getByUser();
    }
  }

  editEvent() {
    this.editing = true;
    this.forceUpdate();
  }

  cancelEditEvent() {
    this.editing = false;
    this.forceUpdate();
  }

  toggleToast() {
    this.setState(state => {
      return { showToast: !state.showToast };
    });
  }

  render() {
    const {
      user,
      event,
      events,
      locations,
      eventTypes,
      updateEvent,
      match: {
        params: { eventId }
      }
    } = this.props;
    const { showToast } = this.state;
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
    const item = events ? events.find(x => x.id === parseInt(eventId)) : null;
    return (
      <div className="vh-100">
        <Toast
          style={{
            position: "absolute",
            top: 0,
            right: "45vw",
            zIndex: 9999
          }}
          onClose={() => this.toggleToast()}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="mr-auto">Info</strong>
          </Toast.Header>
          <Toast.Body>Woohoo, succesful update event</Toast.Body>
        </Toast>

        <TopNavigation
          isListView={this.props.match.path.indexOf("listView") > -1}
        />

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4 event-list">
              {events &&
                events.map((item, index) => {
                  return (
                    <EventListItem
                      item={item}
                      selected={eventId === item.id}
                      key={index}
                    />
                  );
                })}
            </div>
            <div className="col-sm-8 col-sm-offset-12 event-details">
              {!item && (
                <div>
                  Please select an event on the left panel to see more
                  information
                </div>
              )}

              {item && !this.editing && (
                <>
                  <div className={"form-row"}>
                    <div className={"col-12 col-md-6"}>
                      {/*@TODO hide if not an admin nor the event owner*/}
                      <div className={"options " + (false ? "d-none" : "")}>
                        <span>Options: </span>
                        <span
                          className={"text-warning"}
                          onClick={this.editEvent}
                        >
                          Edit
                        </span>{" "}
                        -
                        <ModalDeleteEvent event={item} />
                      </div>

                      <h4>{item.name}</h4>
                      <div className={"label"}>Attendance counter:</div>
                      <div className={"attendance-counter mb-2"}>
                        <div className={"value"}>
                          <span>22222222222</span>
                        </div>
                        <div className={"attend-button"}>
                          {/*@TODO disable if already attending*/}
                          <button
                            className={
                              "btn btn-light " + (user ? "disabled" : "")
                            }
                          >
                            Attend!
                          </button>
                        </div>
                      </div>

                      <div className={"label"}>Description</div>
                      <div className={"mb-2"}>{item.description}</div>

                      <div className={"label"}>Will take place</div>
                      <div className={"mb-2"}>
                        {new Date(item.event_date).toDateString()}
                        {item.location}
                      </div>

                      <div className={"label"}>Category</div>
                      <div className={"mb-2"}>???</div>

                      <div className={"label"}>Entry fee:</div>
                      <div className={"mb-2"}>{item.fee}</div>
                    </div>
                    <div className={"col-12 col-md-6 map-row"}>
                      <MapContainer />
                    </div>
                  </div>
                </>
              )}

              {item && this.editing && (
                <>
                  <Formik
                    initialValues={{
                      id: item.id || "",
                      name: item.name || "",
                      event_date: item.event_date || "",
                      city_id: item.city_id || "",
                      address: item.address || "",
                      type: item.event_type || "",
                      description: item.description || "",
                      entryFee: item.fee || 0.0
                    }}
                    validate={values => {
                      const errors = {};
                      if (!values.name) {
                        errors.name = "Name is either empty or invalid";
                      }
                      if (!values.event_date) {
                        errors.date = "Date is either empty or invalid";
                      }
                      if (!values.city_id) {
                        errors.city_id = "Address is either empty or invalid";
                      }
                      if (!values.description) {
                        errors.description =
                          "Description is either empty or invalid";
                      }
                      if (!values.entryFee) {
                        errors.entryFee =
                          "Entry fee is either empty or invalid";
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      updateEvent(values);
                      this.toggleToast();
                      setSubmitting(false);
                      setTimeout(() => {
                        window.location.reload();
                      }, 2000);
                    }}
                  >
                    {({
                      values,
                      errors,
                      setFieldValue,
                      handleSubmit,
                      isSubmitting
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="formName">Name</label>
                          <Field
                            type="text"
                            name="name"
                            id={"formName"}
                            className={
                              "form-control " +
                              (errors.name ? "is-invalid" : "")
                            }
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className={"invalid-feedback"}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="formDate">Date</label>
                          <DatePicker
                            type="date"
                            name="event_date"
                            className={
                              "form-control " +
                              (errors.event_date ? "is-invalid" : "")
                            }
                            selected={
                              (values.event_date &&
                                new Date(values.event_date)) ||
                              null
                            }
                            id={"formDate"}
                            onChange={event_date => {
                              setFieldValue("event_date", event_date);
                            }}
                            value={values.event_date}
                          />
                          <ErrorMessage
                            name="date"
                            component="div"
                            className={
                              "invalid-feedback " +
                              (errors.date ? "d-block" : "")
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="formName">Address</label>
                          <Field
                            type="text"
                            name="address"
                            id={"formAddress"}
                            className={
                              "form-control " +
                              (errors.address ? "is-invalid" : "")
                            }
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className={"invalid-feedback"}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="formLocation">Location</label>
                          <Field
                            name="city_id"
                            component={SelectField}
                            options={locationsOptions}
                            field={{ value: values.city_id }}
                            className={
                              "form-control " +
                              (errors.city_id ? "is-invalid" : "")
                            }
                          />
                          <ErrorMessage
                            name="city_id"
                            component="div"
                            className={"invalid-feedback"}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="formType">Type</label>
                          <Field
                            name="type"
                            className={
                              "form-control " +
                              (errors.type ? "is-invalid" : "")
                            }
                            component={SelectField}
                            options={typesOptions}
                            field={{ value: values.type }}
                          />
                          <ErrorMessage
                            name="type"
                            component="div"
                            className={"invalid-feedback"}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="formDescription">Description</label>
                          <Field
                            type="text"
                            name="description"
                            className={
                              "form-control " +
                              (errors.description ? "is-invalid" : "")
                            }
                            id={"formDescription"}
                          />
                          <ErrorMessage
                            name="description"
                            component="div"
                            className={"invalid-feedback"}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="formEntryFee">Entry fee</label>
                          <Field
                            type="text"
                            name="entryFee"
                            className={
                              "form-control " +
                              (errors.entryFee ? "is-invalid" : "")
                            }
                            id={"formEntryFee"}
                          />
                          <ErrorMessage
                            name="entryFee"
                            component="div"
                            className={"invalid-feedback"}
                          />
                        </div>

                        <div className={"text-right"}>
                          <button
                            type="button"
                            className={"btn btn-secondary mr-2"}
                            onClick={this.cancelEditEvent}
                          >
                            Cancel
                          </button>
                          {/*@TODO the submit cause crash due to too many setStates, but I dunno how
                                                probably refactor here for the backend will resolve the problem*/}
                          <button
                            type="submit"
                            className={"btn btn-warning"}
                            disabled={isSubmitting}
                          >
                            Edit
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { events, event } = state.events;
  const { locations, eventTypes } = state.ui;
  return { events, locations, eventTypes, event };
};

const actionCreators = {
  getByUser: eventActions.getEvents,
  updateEvent: eventActions.updateEvent,
  getLocations: uiActions.getLocations,
  getEventTypes: uiActions.getEventTypes
};

const connectedRegisterPage = connect(
  mapStateToProps,
  actionCreators
)(ListViewPage);
export { connectedRegisterPage as ListViewPage };
