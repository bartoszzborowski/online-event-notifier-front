import React from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { history } from "helpers/history";
import { RegisterPage } from "routes/RegisterPage";
import { ListViewPage } from "./routes/ListViewPage/ListViewPage";
import { ProfilePage } from "./routes/ProfilePage";
import { AdminPage } from "./routes/AdminPage";
import { AdminEventsPage } from "./routes/AdminEventsPage";
import { AdminUsersPage } from "./routes/AdminUsersPage";
import { AdminUserPage } from "./routes/AdminUserPage/AdminUserPage";
import { PrivateRoute } from "./components/PrivateRoute";
import HomePage from "./routes/HomePage/HomePage";

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      console.log("history");
    });
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <PrivateRoute
            exact
            path="/listView/:eventId"
            component={ListViewPage}
          />
          <PrivateRoute exact path="/listView" component={ListViewPage} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <PrivateRoute
            roles={"admin"}
            exact
            path="/admin"
            component={AdminPage}
          />
          <PrivateRoute
            roles={"admin"}
            exact
            path="/admin/events"
            component={AdminEventsPage}
          />
          <PrivateRoute
            roles={"admin"}
            exact
            path="/admin/users"
            component={AdminUsersPage}
          />
          <PrivateRoute
            roles={"admin"}
            exact
            path="/admin/user/:userId"
            component={AdminUserPage}
          />
          <Route path="/register" component={RegisterPage} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
