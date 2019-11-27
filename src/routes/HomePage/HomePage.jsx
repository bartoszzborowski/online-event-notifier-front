import React from 'react';
import {connect} from 'react-redux';
import MapContainer from "../../components/MapContainer/MapContainer";
import {TopNavigation} from "../../components/TopNavigation";
import {userActions} from "../../stores/actions/user.actions";

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
                <TopNavigation/>
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



