import React from "react";
import MapContainer from "../../components/MapContainer/MapContainer";
import { TopNavigation } from "../../components/TopNavigation";
import { NotificationArea } from "../../components/NotificationArea";
import { eventActions } from "../../stores/actions";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // @TODO probably to be replaced by something else
      loading: true
    }
  }

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
        { this.state.loading && <div className={"d-flex align-items-center h-100 justify-content-center"}>
          <Loader
              type="Triangle"
              color="#00BFFF"
              height={100}
              width={100}
          />
        </div>}
        {!this.state.loading && <MapContainer events={events} />}
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
