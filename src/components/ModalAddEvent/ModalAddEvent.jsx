import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ModalAddEvent.scss";
import { ErrorMessage, Field, Formik } from "formik";
import { eventActions } from "stores/actions";
import { connect } from "react-redux";
import { SelectField } from "../SelectField";
import * as Yup from "yup";

const ModalAddEvent = props => {
  const { addEvent, event, error, locations, eventTypes } = props;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  event &&
    setTimeout(() => {
      handleClose();
    }, 1000);
  return (
    <>
      <button type="button" className="btn btn-secondary" onClick={handleShow}>
        <FontAwesomeIcon icon={faCalendarPlus} />
      </button>

      <Modal show={show} size="lg" onHide={handleClose}>
        <Formik
          initialValues={{
            name: "",
            event_date: "",
            address: "",
            city_id: "",
            type: "",
            description: "",
            entryFee: "",
            latitude: "",
            longitude: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            addEvent(values);
            setTimeout(() => {
              if (error === null) {
                handleClose();
              }
              setSubmitting(false);
            }, 1500);
          }}
        >
          {({ values, errors, setFieldValue, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {event ? "Create new event successful" : "Adding new event"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-group">
                  <label htmlFor="formName">Name</label>
                  <Field
                    type="text"
                    name="name"
                    id={"formName"}
                    className={
                      "form-control " + (errors.name ? "is-invalid" : "")
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
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MM d, yyyy h:mm aa"
                    className={
                      "form-control " + (errors.event_date ? "is-invalid" : "")
                    }
                    selected={values.event_date}
                    id={"formDate"}
                    onChange={event_date => {
                      setFieldValue("event_date", event_date);
                    }}
                  />
                  <ErrorMessage
                    name="event_date"
                    component="div"
                    className={"invalid-feedback"}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="formName">Address</label>
                  <Field
                    type="text"
                    name="address"
                    id={"formAddress"}
                    className={
                      "form-control " + (errors.address ? "is-invalid" : "")
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
                          "form-control " +
                          (errors.latitude ? "is-invalid" : "")
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
                          "form-control " +
                          (errors.longitude ? "is-invalid" : "")
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
                {locations && (
                  <div className="form-group">
                    <label htmlFor="formLocation">Location</label>
                    <Field
                      name="city_id"
                      component={SelectField}
                      options={locationsOptions}
                      field={{ name: "city_id", value: values.city_id }}
                      className={
                        "form-control " + (errors.city_id ? "is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="city_id"
                      component="div"
                      className={
                        "invalid-feedback " + (errors.city_id ? "block" : "")
                      }
                    />
                  </div>
                )}

                {eventTypes && (
                  <div className="form-group">
                    <label htmlFor="formType">Type</label>
                    <Field
                      name="type"
                      className={
                        "form-control " + (errors.type ? "is-invalid" : "")
                      }
                      component={SelectField}
                      disabled={true}
                      options={typesOptions}
                      field={{ name: "type", value: values.type }}
                    />
                    <ErrorMessage
                      name="type"
                      component="div"
                      className={
                        "invalid-feedback " + (errors.type ? "block" : "")
                      }
                    />
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="formDescription">Description</label>
                  <Field
                    type="text"
                    name="description"
                    className={
                      "form-control " + (errors.description ? "is-invalid" : "")
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
                  <label htmlFor="formEntryFee">Fee</label>
                  <Field
                    type="text"
                    name="entryFee"
                    className={
                      "form-control " + (errors.entryFee ? "is-invalid" : "")
                    }
                    id={"formEntryFee"}
                  />
                  <ErrorMessage
                    name="entryFee"
                    component="div"
                    className={"invalid-feedback"}
                  />
                </div>
                <div className={"text-danger mt-auto"}>
                  {error && error.message}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Add
                </button>
                <div className={"text-success mt-auto"}>
                  {event && "Create new event successful"}
                </div>
              </Modal.Footer>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(8, "Name is either empty or invalid")
    .required("Required"),
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
  entryFee: Yup.number().required(),
  city_id: Yup.string().required(),
  type: Yup.string().required(),
  description: Yup.string().required(),
  event_date: Yup.date().required(),
  address: Yup.string().required()
});

const mapStateToProps = state => {
  const { event, error } = state.events || {};
  return { event, error };
};

const actionCreators = {
  addEvent: eventActions.addEvent
};

export default connect(mapStateToProps, actionCreators)(ModalAddEvent);
