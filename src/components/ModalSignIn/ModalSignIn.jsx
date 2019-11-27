import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {useInput} from "../../helpers/common-functions";

export function ModalSignIn() {
    const [show, setShow] = useState(false);
    const {value: email, bind: bindEmail, reset: resetEmail} = useInput('');
    const {value: password, bind: bindPassword, reset: resetPassword} = useInput('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        console.log('submit');
        event.preventDefault();
    };

    return (
        <>
            <button type="button" className="btn btn-secondary" onClick={handleShow}>
                Sign in
            </button>

            <Modal show={show} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign in</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="formEmail">Email</label>
                            <input className="form-control" type="email" placeholder="Enter email" {...bindEmail}
                                   id="formEmail"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="formPassword">Password</label>
                            <input className="form-control" type="password"
                                   placeholder="Enter password" {...bindPassword}
                                   id="formPassword"/>
                        </div>
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
            </Modal>
        </>
    )
}
