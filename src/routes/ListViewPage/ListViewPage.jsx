import React from "react";
import "./ListViewPage.scss";
import MapContainer from "../../components/MapContainer/MapContainer";
import {TopNavigation} from "../../components/TopNavigation/TopNavigation";
import {EventListItem} from "../../components/EventListItem/EventListItem";
import DatePicker from "react-datepicker";
import {ErrorMessage, Field, Formik} from "formik";
import ModalDeleteEvent from "../../components/ModalDeleteEvent/ModalDeleteEvent";
import {eventActions, uiActions, userActions} from "stores/actions";
import {connect} from "react-redux";
import {SelectField} from "../../components/SelectField";
import Toast from "react-bootstrap/Toast";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import {faListAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class ListViewPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.editing = false;
        this.state = {
            showToast: false,
            attendanceCounter: []
        };
        this.editEvent = this.editEvent.bind(this);
        this.cancelEditEvent = this.cancelEditEvent.bind(this);
        this.toggleToast = this.toggleToast.bind(this);
    }

    componentDidMount() {
        const {getByUser, getLocations, getEventTypes, updateUser} = this.props;
        getLocations();
        getEventTypes();
        updateUser();
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
            return {showToast: !state.showToast};
        });
    }

    attendToEvent(userId, eventId, counter) {
        const {attendToEvent, updateUser} = this.props;

        attendToEvent(userId, eventId);
        updateUser();

        this.setState(
            state => ({
                ...state,
                attendanceCounter: {
                    [eventId]: state.attendanceCounter[eventId]
                        ? ++state.attendanceCounter[eventId]
                        : ++counter
                }
            }),
            () => {
                this.forceUpdate();
            }
        );
    }

    render() {
        const {
            user,
            events: allEvents,
            locations,
            eventTypes,
            updateEvent,
            loading,
            userEvents,
            searchedEvents,
            match: {
                params: {eventId}
            }
        } = this.props;

        const events = searchedEvents ? searchedEvents : allEvents;

        const {showToast} = this.state;
        const {id: userId = null} = user;
        const locationsOptions =
            locations &&
            locations.map(item => {
                return {value: item.slug, label: item.name};
            });
        const typesOptions =
            eventTypes &&
            eventTypes.map(item => {
                return {value: item.name, label: item.name};
            });
        const item = events ? events.find(x => x.id === parseInt(eventId)) : null;
        const isOwner = item && userId === item.user_id;

        let isAttendance = false;
        if (userEvents && item) {
            isAttendance = userEvents.filter(event => {
                return event.id === item.id;
            }).length;
        }
        let attendanceCounter = 0;

        if (item) {
            const {attendance_counter: attendanceCounterItem} = item;
            const {attendanceCounter: attendanceCounterState} = this.state;
            attendanceCounter =
                attendanceCounterState[item.id] !== undefined
                    ? attendanceCounterState[item.id] > attendanceCounterItem
                    ? attendanceCounterState[item.id]
                    : attendanceCounterItem
                    : attendanceCounterItem;
        }
        return (
            <div className="vh-100">
                <Toast
                    style={{
                        position: "absolute",
                        top: 0,
                        right: "45vw",
                        zIndex: 9999,
                        display: showToast ? 'block' : 'none'
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
                        <div className="col-sm-4 col-md-3 event-list">
                            { loading && <div className={"d-flex align-items-center h-100 justify-content-center"}>
                                <Loader
                                    type="Triangle"
                                    color="#00BFFF"
                                    height={100}
                                    width={100}
                                />
                            </div>}

                            {!loading && (!events || events.length === 0) &&
                            <div>There are no events matching the search criteria</div>}

                            {!loading &&
                            events &&
                            events.map((item, index) => {
                                return (
                                    <>
                                        <EventListItem
                                            item={item}
                                            selected={+eventId === item.id}
                                            key={index}
                                        />
                                    </>
                                );
                            })}
                        </div>
                        <div className="col-sm-8 event-details">
                            {!item && (
                                <div className={"d-flex flex-column justify-content-center align-items-center h-100"}>
                                    <div className={"list-icon"}><FontAwesomeIcon icon={faListAlt}/></div>
                                    <div>Please select an event from the list to see more information about it</div>
                                </div>
                            )}

                            {item && !this.editing && (
                                <>
                                    <div className={"form-row padding-top-4rem"}>
                                        <div className={"col-12 col-md-6"}>
                                            {(isOwner || user.admin) && (
                                                <div className={"options " + (false ? "d-none" : "")}>
                                                    <span className={"cursor-pointer"}>Options: </span>
                                                    <span
                                                        className={"text-warning cursor-pointer"}
                                                        onClick={this.editEvent}
                                                    >
                            Edit
                          </span>{" "}
                                                    -
                                                    <ModalDeleteEvent event={item}/>
                                                </div>
                                            )}
                                            <h4>{item.name}</h4>
                                            <div className={"label"}>Attendance counter:</div>
                                            <div className={"attendance-counter mb-2"}>
                                                <div className={"value"}>
                                                    <span>{attendanceCounter}</span>
                                                </div>
                                                <div className={"attend-button"}>
                                                    <button
                                                        disabled={isAttendance || isOwner}
                                                        className={
                                                            "btn btn-light "
                                                        }
                                                        onClick={() =>
                                                            this.attendToEvent(
                                                                userId,
                                                                item.id,
                                                                attendanceCounter
                                                            )
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
                                            <div className={"mb-2"}>{item.event_type}</div>

                                            <div className={"label"}>Entry fee:</div>
                                            <div className={"mb-2"}>{item.fee}</div>
                                        </div>
                                        <div className={"col-12 col-md-6 map-row"}>
                                            <MapContainer events={[item]}/>
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
                                            entryFee: item.fee || 0.0,
                                            latitude: item.lat || 0.0,
                                            longitude: item.lng || 0.0,
                                        }}
                                        validate={values => {
                                            const errors = {};
                                            if (!values.name) {
                                                errors.name = "Name is either empty or invalid";
                                            }
                                            if (!values.event_date) {
                                                errors.event_date = "Date is either empty or invalid";
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
                                        onSubmit={(values, {setSubmitting}) => {
                                            console.log('submit');
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
                                                <div className={"form-row"}>
                                    <div className={"col-sm-6"}>
                                        <div className="form-group">
                                            <label htmlFor="formName">Latitude</label>
                                            <Field
                                                type="text"
                                                name="latitude"
                                                id={"formLatitude"}
                                                className={
                                                    "form-control " + (errors.latitude ? "is-invalid" : "")
                                                }
                                            />
                                            <ErrorMessage
                                                name="latitude"
                                                component="div"
                                                className={"invalid-feedback"}
                                            />
                                        </div>
                                    </div>
                                    <div className={"col-sm-6"}>
                                        <div className="form-group">
                                            <label htmlFor="formName">Longitude</label>
                                            <Field
                                                type="text"
                                                name="longitude"
                                                id={"formLongitude"}
                                                className={
                                                    "form-control " + (errors.longitude ? "is-invalid" : "")
                                                }
                                            />
                                            <ErrorMessage
                                                name="longitude"
                                                component="div"
                                                className={"invalid-feedback"}
                                            />
                                        </div>
                                    </div>
                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="formLocation">Location</label>
                                                    <Field
                                                        as="select"
                                                        name="city_id"
                                                        id={"city_id"}
                                                        component={SelectField}
                                                        options={locationsOptions}
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
                                                        as="select"
                                                        name="type"
                                                        className={
                                                            "form-control " +
                                                            (errors.type ? "is-invalid" : "")
                                                        }
                                                        component={SelectField}
                                                        options={typesOptions}
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
                                                    <button
                                                        type="submit"
                                                        className={"btn btn-warning"}
                                                        disabled={isSubmitting}>
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
    const {events, loading, searchedEvents} = state.events;
    const {user, userEvents} = state.authentication;
    const {locations, eventTypes} = state.ui;
    return {
        events,
        locations,
        eventTypes,
        loading,
        user,
        userEvents,
        searchedEvents
    };
};

const actionCreators = {
    getByUser: eventActions.getAllEvents,
    updateEvent: eventActions.updateEvent,
    attendToEvent: eventActions.attendToEvent,
    getLocations: uiActions.getLocations,
    getEventTypes: uiActions.getEventTypes,
    updateUser: userActions.refreshUser
};

const connectedRegisterPage = connect(
    mapStateToProps,
    actionCreators
)(ListViewPage);
export {connectedRegisterPage as ListViewPage};
