import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {Button, Modal} from "react-bootstrap";
import {Formik} from 'formik';

export function ModalDeleteUser(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <span className={"icon-default text-danger"} onClick={handleShow}><FontAwesomeIcon
                icon={faTrashAlt}/></span>

            <Modal show={show} onHide={handleClose}>
                <Formik
                    initialValues={{}}
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}>
                    {({
                          handleSubmit,
                          isSubmitting,
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <Modal.Header closeButton>
                                <Modal.Title>Deleting user</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                You are about to delete a user named <b>{props.user.name}</b> with id <b>{props.user.id}</b>. Are you sure you want to continue?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <button type="submit" className="btn btn-danger" disabled={isSubmitting}>
                                    Delete
                                </button>
                            </Modal.Footer>
                        </form>
                    )}
                </Formik>
            </Modal>
        </>
    )
}
