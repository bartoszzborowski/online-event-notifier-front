import React from 'react';
import './ListViewPage.scss';
import MapContainer from "../../components/MapContainer/MapContainer";
import {TopNavigation} from "../../components/TopNavigation/TopNavigation";
import {EventListItem} from "../../components/EventListItem/EventListItem";
import DatePicker from "react-datepicker";
import {ErrorMessage, Field, Formik} from "formik";
import {ModalDeleteEvent} from "../../components/ModalDeleteEvent/ModalDeleteEvent";

export class ListViewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            event: {
                id: 1,
                name: 'Some very very very very very very long name',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem elit, pretium ut imperdiet vel, semper vestibulum quam. Phasellus rhoncus dolor libero, non sollicitudin elit feugiat id. Aliquam orci metus, bibendum et dui in, porttitor convallis velit.',
                date: '2019-11-27T16:44:16+0000',
                location: '???',
                entryFee: 13.33
            },
            selectedItemId: this.props.match.params.eventId ? +this.props.match.params.eventId : -1,
            listItems: [
                {
                    id: 1,
                    name: 'Some very very very very very very long name',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem elit, pretium ut imperdiet vel, semper vestibulum quam. Phasellus rhoncus dolor libero, non sollicitudin elit feugiat id. Aliquam orci metus, bibendum et dui in, porttitor convallis velit.',
                    date: '2019-11-27T16:44:16+0000',
                    location: '???',
                    entryFee: 13.33
                },
                {
                    id: 2,
                    name: 'test2',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem elit, pretium ut imperdiet vel, semper vestibulum quam. Phasellus rhoncus dolor libero, non sollicitudin elit feugiat id. Aliquam orci metus, bibendum et dui in, porttitor convallis velit.',
                    date: '2019-11-27T16:44:16+0000',
                    location: '???',
                    entryFee: 28.99
                },
                {
                    id: 3,
                    name: 'test3',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem elit, pretium ut imperdiet vel, semper vestibulum quam. Phasellus rhoncus dolor libero, non sollicitudin elit feugiat id. Aliquam orci metus, bibendum et dui in, porttitor convallis velit.',
                    date: '2019-11-27T16:44:16+0000',
                    location: '???',
                    entryFee: 30
                },
                {
                    id: 4,
                    name: 'test4',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem elit, pretium ut imperdiet vel, semper vestibulum quam. Phasellus rhoncus dolor libero, non sollicitudin elit feugiat id. Aliquam orci metus, bibendum et dui in, porttitor convallis velit.',
                    date: '2019-11-27T16:44:16+0000',
                    location: '???',
                    entryFee: 128
                }
            ]
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.onRouteChanged();
        }
    }

    onRouteChanged() {
        const eventId = this.props.match.params.eventId ? +this.props.match.params.eventId : -1;
        this.setState({
            selectedItemId: eventId
        });
    }

    render() {
        const {user} = this.props;
        const item = this.state.listItems.find(x => x.id === this.state.selectedItemId);
        return (
            <div className="vh-100">
                <TopNavigation isListView={this.props.match.path.indexOf('listView') > -1}/>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4 event-list">
                            {this.state.listItems.map((item, index) => {
                                return <EventListItem item={item} selected={this.state.selectedItemId === item.id} key={index}/>
                            })}

                        </div>
                        <div className="col-sm-8 col-sm-offset-12 event-details">
                            {!item &&
                            <div>Please select an event on the left panel to see more information</div>
                            }

                            {item && !this.state.editing &&
                            <>
                                <div className={"form-row"}>
                                    <div className={"col-12 col-md-6"}>
                                        {/*@TODO hide if not an admin nor the event owner*/}
                                        <div className={"options " + (false ? "d-none" : "")}>
                                            <span>Options: </span>
                                            <span className={"text-warning"}
                                                  onClick={() => {this.setState({editing: true})}}>
                                                Edit</span> -
                                            <ModalDeleteEvent event={item}/>
                                        </div>

                                        <h4>{item.name}</h4>
                                        <div className={"label"}>Attendance counter:</div>
                                        <div className={"attendance-counter mb-2"}>
                                            <div className={"value"}>
                                                <span>22222222222</span>
                                            </div>
                                            <div className={"attend-button"}>
                                                {/*@TODO disable if already attending*/}
                                                <button className={"btn btn-light " + (user ? 'disabled' : '')}>
                                                    Attend!
                                                </button>
                                            </div>
                                        </div>

                                        <div className={"label"}>Description</div>
                                        <div className={"mb-2"}>{item.description}</div>

                                        <div className={"label"}>Will take place</div>
                                        <div
                                            className={"mb-2"}>{new Date(item.date).toTimeString()} {item.location}</div>

                                        <div className={"label"}>Category</div>
                                        <div className={"mb-2"}>???</div>

                                        <div className={"label"}>Entry fee:</div>
                                        <div className={"mb-2"}>{item.entryFee}</div>
                                    </div>
                                    <div className={"col-12 col-md-6 map-row"}>
                                        <MapContainer/>
                                    </div>
                                </div>
                            </>
                            }

                            {item && this.state.editing &&
                                <>
                                <Formik
                                    initialValues={{
                                        name: this.state.event ? this.state.event.name : '',
                                        date: this.state.event ? this.state.event.date : '',
                                        location: this.state.event ? this.state.event.location : '',
                                        type: this.state.event ? this.state.event.type : '',
                                        description: this.state.event ? this.state.event.description : '',
                                        entryFee: this.state.event ? this.state.event.entryFee : '' }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.name) {
                                            errors.name = 'Name is either empty or invalid';
                                        }
                                        if (!values.date) {
                                            errors.date = 'Date is either empty or invalid';
                                        }
                                        if (!values.location) {
                                            errors.location = 'Location is either empty or invalid';
                                        }
                                        if (!values.type) {
                                            errors.type = 'Type is either empty or invalid';
                                        }
                                        if (!values.description) {
                                            errors.description = 'Description is either empty or invalid';
                                        }
                                        if (!values.entryFee) {
                                            errors.entryFee = 'Entry fee is either empty or invalid';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, {setSubmitting}) => {
                                        setTimeout(() => {
                                            alert(JSON.stringify(values, null, 2));
                                            setSubmitting(false);
                                            this.setState({editing: false});
                                        }, 400);
                                    }}>
                                    {({
                                          values,
                                          errors,
                                          setFieldValue,
                                          handleSubmit,
                                          isSubmitting,
                                      }) => (
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="formName">Name</label>
                                                <Field type="text" name="name" id={"formName"}
                                                       className={"form-control " + (errors.name ? 'is-invalid' : '')}/>
                                                <ErrorMessage name="name" component="div" className={"invalid-feedback"}/>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="formDate">Date</label>
                                                <DatePicker type="date" name="date"
                                                            className={"form-control " + (errors.date ? 'is-invalid' : '')}
                                                            selected={values.date}
                                                            id={"formDate"}
                                                            onChange={(date) => {
                                                                setFieldValue('date', date);
                                                            }}
                                                            value={values.date}/>
                                                <ErrorMessage name="date" component="div" className={"invalid-feedback " + (errors.date ? 'd-block' : '')}/>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="formLocation">Location</label>
                                                <Field type="text" name="location"
                                                       className={"form-control " + (errors.location ? 'is-invalid' : '')}
                                                       id={"formLocation"}/>
                                                <ErrorMessage name="location" component="div" className={"invalid-feedback"}/>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="formType">Type</label>
                                                <Field type="text" name="type"
                                                       className={"form-control " + (errors.type ? 'is-invalid' : '')}
                                                       id={"formType"}/>
                                                <ErrorMessage name="type" component="div" className={"invalid-feedback"}/>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="formDescription">Description</label>
                                                <Field type="text" name="description"
                                                       className={"form-control " + (errors.description ? 'is-invalid' : '')}
                                                       id={"formDescription"}/>
                                                <ErrorMessage name="description" component="div" className={"invalid-feedback"}/>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="formEntryFee">Entry fee</label>
                                                <Field type="text" name="entryFee"
                                                       className={"form-control " + (errors.entryFee ? 'is-invalid' : '')}
                                                       id={"formEntryFee"}/>
                                                <ErrorMessage name="entryFee" component="div" className={"invalid-feedback"}/>
                                            </div>

                                            <div className={"text-right"}>
                                                <button type="button" className={"btn btn-secondary mr-2"} onClick={() => {this.setState({editing: false})}}>Cancel</button>
                                                {/*@TODO the submit cause crash due to too many setStates, but I dunno how
                                                probably refactor here for the backend will resolve the problem*/}
                                                <button type="submit" className={"btn btn-warning"} disabled={isSubmitting}>Edit</button>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
