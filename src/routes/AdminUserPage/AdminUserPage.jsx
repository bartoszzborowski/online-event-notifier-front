import React from 'react';
import {TopNavigation} from "../../components/TopNavigation";
import {Link} from "react-router-dom";
import {ErrorMessage, Field, Formik} from "formik";

export class AdminUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: 1,
                email: 'ww@ww.ww',
                name: 'Jan Kowalski',
                isAdmin: false
            }
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
                                <Formik
                                    initialValues={{
                                        id: this.state.user ? this.state.user.id : '',
                                        email: this.state.user ? this.state.user.email : '',
                                        name: this.state.user ? this.state.user.name : '',
                                        isAdmin: this.state.user ? this.state.user.isAdmin.toString() : ''
                                    }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.email) {
                                            errors.email = 'Email is either empty or invalid';
                                        }
                                        if (!values.name) {
                                            errors.name = 'Name is either empty or invalid';
                                        }
                                        if (!values.isAdmin) {
                                            errors.isAdmin = 'Role is either empty or invalid';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, {setSubmitting}) => {
                                        setTimeout(() => {
                                            alert(JSON.stringify(values, null, 2));
                                            setSubmitting(false);
                                        }, 400);
                                    }}>
                                    {({
                                          setFieldValue,
                                          values,
                                          errors,
                                          handleSubmit,
                                      }) => (
                                        <form onSubmit={handleSubmit}>
                                            <div className={"card-header"}>
                                                Editing user
                                            </div>
                                            <div className={"card-body"}>
                                                <div className="form-group">
                                                    <label htmlFor="id">ID</label>
                                                    <Field type="number" name="id" id={"id"}
                                                           className={"form-control form-control-sm " + (errors.id ? 'is-invalid' : '')}
                                                           placeholder="Enter id" disabled/>
                                                    <ErrorMessage name="id" component="div"
                                                                  className={"invalid-feedback"}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <Field type="text" name="email" id={"email"}
                                                           className={"form-control form-control-sm " + (errors.email ? 'is-invalid' : '')}
                                                           placeholder="Enter email"/>
                                                    <ErrorMessage name="email" component="div"
                                                                  className={"invalid-feedback"}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="name">Name</label>
                                                    <Field type="text" name="name" id={"name"}
                                                           className={"form-control form-control-sm " + (errors.name ? 'is-invalid' : '')}
                                                           placeholder="Enter name"/>
                                                    <ErrorMessage name="name" component="div"
                                                                  className={"invalid-feedback"}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="isAdmin">Is Admin</label>
                                                    <select
                                                        className={"custom-select custom-select-sm " + (errors.isAdmin ? 'is-invalid' : '')}
                                                        name={"isAdmin"} id={"isAdmin"}
                                                        onChange={(event) => {
                                                            setFieldValue('isAdmin', event.target.value);
                                                        }}>
                                                        <option value={"true"}
                                                                selected={values.isAdmin === this.state.user.isAdmin.toString()}>True
                                                        </option>
                                                        <option value={"false"}
                                                                selected={values.isAdmin === this.state.user.isAdmin.toString()}>False
                                                        </option>
                                                    </select>
                                                    <ErrorMessage name="isAdmin" component="div"
                                                                  className={"invalid-feedback"}/>
                                                </div>
                                            </div>
                                            <div className={"card-footer text-right"}>
                                                <Link to={"../users"} className={"btn btn-primary btn-sm mr-2"}>
                                                    Cancel
                                                </Link>
                                                <button type={"submit"} className={"btn btn-warning btn-sm"}>
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}



