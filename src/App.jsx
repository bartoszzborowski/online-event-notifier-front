import React from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {history} from 'helpers/history';
import {HomePage} from 'routes/HomePage';
import {RegisterPage} from 'routes/RegisterPage';
import {ListViewPage} from "./routes/ListViewPage/ListViewPage";
import {ProfilePage} from "./routes/ProfilePage";
import {AdminPage} from "./routes/AdminPage";
import {AdminEventsPage} from "./routes/AdminEventsPage";
import {AdminUsersPage} from "./routes/AdminUsersPage";
import {AdminUserPage} from "./routes/AdminUserPage/AdminUserPage";

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            console.log('history');
        });
    }

    render() {
        return (

            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/listView/:eventId" component={ListViewPage}/>
                    <Route exact path="/listView" component={ListViewPage}/>
                    <Route exact path="/profile" component={ProfilePage}/>
                    <Route exact path="/admin" component={AdminPage}/>
                    <Route exact path="/admin/events" component={AdminEventsPage}/>
                    <Route exact path="/admin/users" component={AdminUsersPage}/>
                    <Route exact path="/admin/user/:userId" component={AdminUserPage}/>
                    <Route path="/register" component={RegisterPage}/>
                    <Redirect from="*" to="/"/>
                </Switch>
            </Router>
        );
    }
}


export default App;
