import React from 'react';
import {ErrorMessage, Field, Formik} from "formik";
import {TopNavigation} from "../../components/TopNavigation";
import {EventListItem} from "../../components/EventListItem";
import {Button} from "react-bootstrap";

export class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attendingEvents: [
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
            ],
            userEvents: [
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
            ],
        }
    }

    render() {
        return (
            <>
                <TopNavigation/>
                <div className={"container-fluid"}>
                    <div className={"row"} style={{marginTop: '5rem'}}>
                        <div className={"col-12"}>
                            <div className={"card"}>
                                <div className={"card-header"}>
                                    Profile
                                </div>
                                <div className={"card-body"}>
                                    <div className={"form-row"}>
                                        <div className={"col-sm-4"}>
                                            <h5>Account data</h5>
                                            <Formik
                                                initialValues={{
                                                    email: 'email@email.email',
                                                    name: '',
                                                    password: '',
                                                    confirmPassword: ''
                                                }}
                                                validate={values => {
                                                    const errors = {};
                                                    if (!values.name) {
                                                        errors.name = 'Name is either not provided or is invalid'
                                                    }
                                                    return errors;
                                                }}
                                                onSubmit={(values, {setSubmitting}) => {
                                                    setTimeout(() => {
                                                        alert(JSON.stringify(values, null, 2));
                                                        setSubmitting(false);
                                                    }, 400);
                                                }}
                                            >
                                                {({
                                                      errors,
                                                      handleSubmit,
                                                  }) => (
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="form-group">
                                                            <label htmlFor="email">Email</label>
                                                            <Field type="email" name="email" id={"email"}
                                                                   className={"form-control " + (errors.email ? 'is-invalid' : '')}
                                                                   placeholder="Enter email" disabled/>
                                                            <ErrorMessage name="email" component="div"
                                                                          className={"invalid-feedback"}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="name">Name</label>
                                                            <Field type="text" name="name" id={"name"}
                                                                   className={"form-control " + (errors.name ? 'is-invalid' : '')}
                                                                   placeholder="Enter name"/>
                                                            <ErrorMessage name="name" component="div"
                                                                          className={"invalid-feedback"}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="password">Password</label>
                                                            <Field type="password" name="password" id={"password"}
                                                                   className={"form-control " + (errors.password ? 'is-invalid' : '')}
                                                                   placeholder="Enter Password"/>
                                                            <ErrorMessage name="password" component="div"
                                                                          className={"invalid-feedback"}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="confirmPassword">Confirm password</label>
                                                            <Field type="password" name="confirmPassword"
                                                                   id={"confirmPassword"}
                                                                   className={"form-control " + (errors.confirmPassword ? 'is-invalid' : '')}
                                                                   placeholder="Confirm the password"/>
                                                            <ErrorMessage name="confirmPassword" component="div"
                                                                          className={"invalid-feedback"}/>
                                                        </div>
                                                        <div className={"text-right"}>
                                                            <Button variant="secondary" className={"mr-2"}>
                                                                Reset
                                                            </Button>
                                                            <button className={"btn btn-primary"} type={"submit"}>
                                                                Edit
                                                            </button>
                                                        </div>
                                                    </form>
                                                )}
                                            </Formik>
                                        </div>
                                        <div className={"col-sm-4"}>
                                            <h5>Events you attend</h5>
                                            {this.state.attendingEvents.map((item, index) => {
                                                return <EventListItem item={item} key={index}/>
                                            })}
                                        </div>
                                        <div className={"col-sm-4"}>
                                            <h5>Events you've created</h5>
                                            {this.state.userEvents.map((item, index) => {
                                                return <EventListItem item={item} key={index}/>
                                            })}
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

