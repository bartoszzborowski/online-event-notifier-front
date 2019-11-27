import React from 'react';
import {connect} from 'react-redux';
import {userActions} from 'stores/actions';
import MapContainer from "../../components/MapContainer/MapContainer";
import './HomePage.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilter, faList, faSearch, faSignOutAlt, faUserAlt} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import {ModalSignIn} from "../../components/ModalSignIn";
import {ModalAddEvent} from "../../components/ModalAddEvent";

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
                        <ModalAddEvent/>
                        <button type="button" className="btn btn-secondary">
                            <FontAwesomeIcon icon={faUserAlt}/>
                        </button>
                        <Link to="/login" className="btn btn-secondary rounded-right">
                            <FontAwesomeIcon icon={faSignOutAlt}/>
                        </Link>
                    </div>}

                    {!user && <ModalSignIn/>}
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



