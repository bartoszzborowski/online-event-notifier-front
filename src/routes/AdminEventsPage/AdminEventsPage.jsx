import React from "react";
import { TopNavigation } from "../../components/TopNavigation";
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Field, Formik } from "formik";
import DatePicker from "react-datepicker";
import ModalDeleteEvent from "../../components/ModalDeleteEvent/ModalDeleteEvent";
import { connect } from "react-redux";
import { eventActions } from "stores/actions";
import { SelectField } from "../../components/SelectField";

class AdminEventsPage extends React.Component {
  componentDidMount() {
    const { getAll } = this.props;
    if (getAll) {
      getAll();
    }
  }

  componentWillUnmount() {
    const { searchEvent } = this.props;
    searchEvent({});
  }

  render() {
    const {
      locations,
      events: allEvents,
      loading,
      searchEvent,
      searchedEvents,
      match: {
        params: { eventId }
      }
    } = this.props;

    const events = searchedEvents ? searchedEvents : allEvents;

    const locationsOptions =
      locations &&
      locations.map(item => {
        return { value: item.slug, label: item.name };
      });

    const onSubmit = async (
      values,
      { setSubmitting, setErrors, setStatus, resetForm }
    ) => {
      searchEvent(values).then(items => {
        setSubmitting(false);
      });
    };

    return (
      <>
        <TopNavigation />
        <div className={"container-fluid"}>
          <div className={"row"} style={{ marginTop: "5rem" }}>
            <div className={"col-12"}>
              <div className={"card"}>
                <Formik
                  initialValues={{
                    id: "",
                    name: "",
                    location: "",
                    date: ""
                  }}
                  onSubmit={onSubmit}
                >
                  {({ setFieldValue, values, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <div className={"card-header p-2"}>Search criteria</div>
                      <div className={"card-body p-2"}>
                        <div className={"form-row"}>
                          <div className={"col-sm-4 col-md-3"}>
                            <div className="form-group">
                              <label htmlFor="id">ID</label>
                              <Field
                                type="number"
                                name="id"
                                id={"id"}
                                className={"form-control form-control-md"}
                                placeholder="Enter id"
                              />
                            </div>
                          </div>
                          <div className={"col-sm-4 col-md-3"}>
                            <div className="form-group">
                              <label htmlFor="name">Name</label>
                              <Field
                                type="text"
                                name="name"
                                id={"name"}
                                className={"form-control form-control-md"}
                                placeholder="Enter name"
                              />
                            </div>
                          </div>
                          <div className={"col-sm-4 col-md-3"}>
                            <div className="form-group">
                              <label htmlFor="location">Location</label>
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
                              <label htmlFor="date">Date</label>
                              <DatePicker
                                type="date"
                                name="date"
                                className={"form-control form-control-md"}
                                selected={values.date}
                                id={"date"}
                                onChange={date => {
                                  setFieldValue("date", date);
                                }}
                                placeholder={"Enter date"}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={"card-footer p-2 text-right"}>
                        <button
                          type={"submit"}
                          className={"btn btn-primary btn-sm"}
                          disabled={loading}
                        >
                          <FontAwesomeIcon icon={faSearch} className={"mr-1"} />
                          Search
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>

              <div className={"card mt-4 mb-4"}>
                <div className={"card-header"}>Events</div>
                <div className={"card-body p-0"}>
                  <div className={"table-responsive"}>
                    <table className={"table table-striped mb-0"}>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Entry fee</th>
                          <th className={"text-center"}>Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading && (
                          <tr>
                            <td colSpan="5" className={"text-center"}>
                              Loading events...
                            </td>
                          </tr>
                        )}
                        {!loading && (!events || events.length === 0) && (
                          <tr>
                            <td colSpan="5" className={"text-center"}>
                              There are no events matching the search criteria
                            </td>
                          </tr>
                        )}
                        {!loading &&
                          events &&
                          events.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.id}</td>
                                <td>
                                  <Link
                                    to={"../listView/" + item.id}
                                    className={"icon-default"}
                                  >
                                    {item.name}
                                  </Link>
                                </td>
                                <td>{item.description}</td>
                                <td>{item.fee}</td>
                                <td className={"text-center"}>
                                  <Link
                                    to={"../listView/" + item.id}
                                    className={"icon-default"}
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </Link>
                                  <ModalDeleteEvent
                                    useIcon={true}
                                    event={item}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
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
  const { events, event, loading, newEvents, searchedEvents } = state.events;
  const { locations, eventTypes } = state.ui;
  return {
    events,
    event,
    loading,
    newEvents,
    locations,
    eventTypes,
    searchedEvents
  };
};

const actionCreators = {
  getAll: eventActions.getAllEvents,
  searchEvent: eventActions.searchEvent
};

const connectedRegisterPage = connect(
  mapStateToProps,
  actionCreators
)(AdminEventsPage);

export { connectedRegisterPage as AdminEventsPage };
