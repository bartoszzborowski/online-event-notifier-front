import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {ErrorMessage, Field, Formik} from 'formik';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import { userActions } from 'stores/actions';

const ModalSignIn = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {login: LoginUser, error} = props;
    return (
        <>
            <button type="button" className="btn btn-secondary" onClick={handleShow}>
                Sign in
            </button>

            <Modal show={show} onHide={handleClose}>
                <Formik
                    initialValues={{email: '', password: ''}}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Email is either not provided or is in incorrect form.';
                        }

                        if (!values.password) {
                           errors.password = "Password is either not provided or is in incorrect form."
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        LoginUser(values.email, values.password);
                        setSubmitting(false);
                        // setTimeout(() => {
                        //     alert(JSON.stringify(values, null, 2));
                        //     setSubmitting(false);
                        // }, 400);
                    }}
                >
                    {({
                          errors,
                          handleSubmit,
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <Modal.Header closeButton>
                                <Modal.Title>Sign in</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="form-group">
                                    <label htmlFor="formEmail">Email</label>
                                    <Field type="email" name="email" id={"formEmail"}
                                           className={"form-control " + (errors.email ? 'is-invalid' : '')}
                                           placeholder="Enter email"/>
                                    <ErrorMessage name="email" component="div" className={"invalid-feedback"}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="formPassword">Password</label>
                                    <Field type="password" name="password" id={"formPassword"}
                                           className={"form-control " + (errors.password ? 'is-invalid' : '')}
                                           placeholder="Enter password"/>
                                    <ErrorMessage name="password" component="div" className={"invalid-feedback"}/>
                                </div>
                                <Link to={'../register'}>Doesn't have an account? Register here!</Link>
                                {error && error}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <button className={"btn btn-primary"} type={"submit"}>
                                    Sign in
                                </button>
                            </Modal.Footer>
                        </form>
                    )}
                </Formik>
            </Modal>
        </>
    )
};


function mapState(state) {
    const { loggingIn = false, error } = state.authentication || {};
    return { loggingIn, error };
}

const actionCreators = {
    login: userActions.login,
};

export default connect(mapState, actionCreators)(ModalSignIn)
