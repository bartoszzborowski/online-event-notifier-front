import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarPlus} from "@fortawesome/free-solid-svg-icons";
import {Button, Modal} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ModalAddEvent.scss"
import {useInput} from "../../helpers/common-functions";

export function ModalAddEvent(props) {
    const [show, setShow] = useState(false);
    const {value: name, bind: bindName, reset: resetName} = useInput('');
    const {value: location, bind: bindLocation, reset: resetLocation} = useInput('');
    const {value: type, bind: bindType, reset: resetType} = useInput('');
    const {value: description, bind: bindDescription, reset: resetDescription} = useInput('');
    const {value: entryFee, bind: bindEntryFee, reset: resetEntryFee} = useInput('');

    const [date, setDate] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        console.log('submit');
        event.preventDefault();
        alert(`Submitting Name ${name}`);
        resetName();
    };

    return (
        <>
            <button type="button" className="btn btn-secondary" onClick={handleShow}>
                <FontAwesomeIcon icon={faCalendarPlus}/>
            </button>

            <Modal show={show} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Adding new event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="formName">Name</label>
                            <input className="form-control" type="text" placeholder="Enter event name" {...bindName}
                                   id="formName"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="formDate">Date</label>
                            {/*TODO target is null, wtf?*/}
                            <DatePicker className="form-control" id="formDate" value={date}
                                        onChange={e => setDate(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="formLocation">Location</label>
                            <input className="form-control" type="text" placeholder="Enter location" {...bindLocation}
                                   id="formLocation"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="formType">Type</label>
                            <input className="form-control" type="text" placeholder="Enter type" {...bindType}
                                   id="formType"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="formDescription">Description</label>
                            <textarea className="form-control" type="text"
                                      placeholder="Enter description" {...bindDescription}
                                      id="formDescription"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="formEntryFee">Type</label>
                            <input className="form-control" type="text" placeholder="Enter entry fee" {...bindEntryFee}
                                   id="formEntryFee"/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <button type="submit" className="btn btn-primary">
                            Add
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}
