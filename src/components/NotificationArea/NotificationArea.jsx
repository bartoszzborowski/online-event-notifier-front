import React from "react";
import "./NotificationArea.scss";
import { ToastItem } from "./ToastItem";

export class NotificationArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersOpened: false
    };
  }

  render() {
    const { events } = this.props;
    const currentTime = new Date();

    const slicedEvents =
      events &&
      events
        .filter(event => {
          if (new Date(event.event_date) > currentTime) {
            return event;
          }
        })
        .slice(0, 4)
        .reverse();
    console.log("slicedEvents", slicedEvents);
    // const slicedEvents = events && events.slice(0, 4);
    const notificationAreaItems = [];
    events &&
      slicedEvents.map(event => {
        return notificationAreaItems.push(<ToastItem event={event} />);
      });
    return (
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "relative",
          minHeight: "200px"
        }}
      >
        {notificationAreaItems}
      </div>
    );
  }
}
