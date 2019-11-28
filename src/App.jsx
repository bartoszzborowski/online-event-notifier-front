import React from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';

import {history} from 'helpers/history';
import {HomePage} from 'routes/HomePage';
import {ListView} from 'routes/ListView';
import {LoginPage} from 'routes/LoginEntryPage';
import {RegisterPage} from 'routes/RegisterPage';

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
                    <Route exact path="/listView/:eventId" component={ListView}/>
                    <Route exact path="/listView" component={ListView}/>
                    <Route path="/register" component={RegisterPage}/>
                    <Redirect from="*" to="/"/>
                </Switch>
            </Router>
        );
    }
}


export default App;
