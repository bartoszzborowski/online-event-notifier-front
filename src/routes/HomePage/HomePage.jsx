import React, {useState} from 'react';
import {connect} from 'react-redux';
import {userActions} from 'stores/actions';
import MapContainer from "../../components/MapContainer/MapContainer";
import './HomePage.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarPlus, faFilter, faList, faSearch, faSignOutAlt, faUserAlt} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import {Button, Modal} from 'react-bootstrap';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const {users, user} = this.props;
        return (
            <div className="vh-100">
                <ModalSignIn/>
                <div className="input-group navigation-group top-left">
                    <input type="text" className="form-control" placeholder="" aria-label=""
                           aria-describedby="basic-addon1"/>
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="button">
                            <FontAwesomeIcon icon={faSearch}/>
                        </button>
                        <button className="btn btn-secondary" type="button">
                            <FontAwesomeIcon icon={faFilter}/>
                        </button>
                        <Link to='/listView' className="btn btn-secondary rounded-right">
                            <FontAwesomeIcon icon={faList}/>
                        </Link>
                    </div>
                </div>
                <div className="navigation-group top-right">
                    {user && <div className="btn-group">
                        <button type="button" className="btn btn-secondary">
                            <FontAwesomeIcon icon={faCalendarPlus}/>
                        </button>
                        <button type="button" className="btn btn-secondary">
                            <FontAwesomeIcon icon={faUserAlt}/>
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={() => this.handleDeleteUser()}>
                            <FontAwesomeIcon icon={faSignOutAlt}/>
                        </button>
                    </div>}

                    {!user && <button className="btn btn-secondary" type="button">
                        Sign in
                    </button>}
                </div>
                <MapContainer></MapContainer>
            </div>
        );
    }
}

function mapState(state) {
    const {users = [], authentication = {}} = state;
    const {user = {}} = authentication;
    return {user, users};
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export {connectedHomePage as HomePage};

function ModalSignIn() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
            );
        </>
    )
}

