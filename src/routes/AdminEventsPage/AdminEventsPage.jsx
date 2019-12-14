import React from "react";
import { TopNavigation } from "../../components/TopNavigation";
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import MapContainer from "../../components/MapContainer/MapContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EventListItem } from "../../components/EventListItem/EventListItem";
import { Link } from "react-router-dom";
import { Field, Formik } from "formik";
import DatePicker from "react-datepicker";
import ModalDeleteEvent from "../../components/ModalDeleteEvent/ModalDeleteEvent";
import { connect } from "react-redux";
import { eventActions } from "stores/actions";


class AdminEventsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: {
        total: 100,
        records: [
          {
            id: 1,
            name: "Some very very very very very very long name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem elit, pretium ut imperdiet vel, semper vestibulum quam. Phasellus rhoncus dolor libero, non sollicitudin elit feugiat id. Aliquam orci metus, bibendum et dui in, porttitor convallis velit.",
            date: "2019-11-27T16:44:16+0000",
            location: "???",
            entryFee: 13.33
          },
          {
            id: 2,
            name: "test2",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem elit, pretium ut imperdiet vel, semper vestibulum quam. Phasellus rhoncus dolor libero, non sollicitudin elit feugiat id. Aliquam orci metus, bibendum et dui in, porttitor convallis velit.",
            date: "2019-11-27T16:44:16+0000",
            location: "???",
            entryFee: 28.99
          },
          {
            id: 3,
            name: "test3",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem elit, pretium ut imperdiet vel, semper vestibulum quam. Phasellus rhoncus dolor libero, non sollicitudin elit feugiat id. Aliquam orci metus, bibendum et dui in, porttitor convallis velit.",
            date: "2019-11-27T16:44:16+0000",
            location: "???",
            entryFee: 30
          },
          {
            id: 4,
            name: "test4",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem elit, pretium ut imperdiet vel, semper vestibulum quam. Phasellus rhoncus dolor libero, non sollicitudin elit feugiat id. Aliquam orci metus, bibendum et dui in, porttitor convallis velit.",
            date: "2019-11-27T16:44:16+0000",
            location: "???",
            entryFee: 128
          }
        ]
      }
    };
  }
  componentDidMount() {
    const {getAll} =this.props;
    if (getAll){
      getAll();
    }
  }

  render() {
    // const newEvents = [];
    const{
      events,
      loading,
      match: {
        params: { eventId }
      }
    } = this.props;
    // const item = events ? events.find(x => x.id === parseInt(eventId)) : null;
    // console.log('events', events);
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
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 400);
                  }}
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
                                className={"form-control form-control-sm"}
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
                                className={"form-control form-control-sm"}
                                placeholder="Enter name"
                              />
                            </div>
                          </div>
                          <div className={"col-sm-4 col-md-3"}>
                            <div className="form-group">
                              <label htmlFor="location">Location</label>
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
                              <label htmlFor="date">Date</label>
                              <DatePicker
                                type="date"
                                name="date"
                                className={"form-control form-control-sm"}
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
                        
                        {loading && <tr>
                      <td colSpan="5"><div><center>Loading events....</center></div></td>
                        </tr>}
{events && events.map((item, index) => {
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
                                <ModalDeleteEvent useIcon={true} event={item} />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className={"card-footer text-center"}>
                  {/*@TODO pagination*/}
                  IMAGINE PAGINATION HERE
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
  const { events, event, loading, newEvents } = state.events;
  return { events, event, loading, newEvents};
}


const actionCreators = {
  getAll: eventActions.getAllEvents,
};


const connectedRegisterPage = connect(
  mapStateToProps,
  actionCreators
)(AdminEventsPage);

export { connectedRegisterPage as AdminEventsPage };

