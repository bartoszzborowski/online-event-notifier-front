import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bootstrap";
import { Formik } from "formik";
import { eventActions } from "../../stores/actions";
import { connect } from "react-redux";

const ModalDeleteEvent = props => {
  const [show, setShow] = useState(false);
  const { deleteEvent } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {props.useIcon && (
        <span className={"icon-default text-danger"} onClick={handleShow}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </span>
      )}
      {!props.useIcon && (
        <span className={"text-danger"} onClick={handleShow}>
          {" "}
          Delete
        </span>
      )}

      <Modal show={show} onHide={handleClose}>
        <Formik
          initialValues={{}}
          onSubmit={(values, { setSubmitting }) => {
            deleteEvent(props.event.id);
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Deleting event</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                You are about to delete an event named <b>{props.event.name}</b>{" "}
                with id <b>{props.event.id}</b>. Are you sure you want to
                continue?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <button
                  type="submit"
                  className="btn btn-danger"
                  disabled={isSubmitting}
                >
                  Delete
                </button>
              </Modal.Footer>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

const mapStateToProps = state => {
  const { error } = state.events || {};
  return { error };
};

const actionCreators = {
  deleteEvent: eventActions.deleteEvent
};

export default connect(mapStateToProps, actionCreators)(ModalDeleteEvent);
