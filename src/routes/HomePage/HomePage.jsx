import React from "react";
import MapContainer from "../../components/MapContainer/MapContainer";
import { TopNavigation } from "../../components/TopNavigation";
import { NotificationArea } from "../../components/NotificationArea";
import { eventActions } from "../../stores/actions";
import { connect } from "react-redux";

class HomePage extends React.Component {
  componentDidMount() {
    const { getByUser } = this.props;
    if (getByUser) {
      getByUser();
    }
  }

  render() {
    const { events } = this.props;

    return (
      <div className="vh-100">
        <TopNavigation />
        <MapContainer events={events} />
        <NotificationArea events={events} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { events, loading, searchedEvents } = state.events;
  return { events, loading, searchedEvents };
};

const actionCreators = {
  getByUser: eventActions.getAllEvents
};

const connectedRegisterPage = connect(
  mapStateToProps,
  actionCreators
)(HomePage);
export { connectedRegisterPage as HomePage };
