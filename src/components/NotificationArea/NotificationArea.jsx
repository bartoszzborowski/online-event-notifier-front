import React from "react";
import "./NotificationArea.scss";
import {ToastItem} from "./ToastItem";
import {eventActions} from "../../stores/actions";
import {connect} from "react-redux";

class NotificationArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersOpened: false
    };
  }

  render() {
    const {loading, events} = this.props;
    const currentTime = new Date();
    const notificationItems = !loading && events &&
        events
            .filter(event => new Date(event.event_date) > currentTime)
            .slice(0, 4)
            .reverse();
    console.log(loading, events, notificationItems);

    return (
        <div aria-live="polite" aria-atomic="true" className={"notification-area"}>
          {!loading && events && notificationItems.map((item, index) => {
            return (
                <ToastItem event={item} key={index}/>
            );
          })}
        </div>
    );
  }
}

const mapStateToProps = state => {
  const {events, loading} = state.events;
  return {events, loading};
};

const actionCreators = {
  getByUser: eventActions.getAllEvents
};

const connectedNotificationArea = connect(
    mapStateToProps,
    actionCreators
)(NotificationArea);
export {connectedNotificationArea as NotificationArea};
