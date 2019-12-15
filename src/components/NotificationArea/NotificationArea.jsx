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
    const slicedEvents = events && events.slice(0, 4);
    const notificationAreaItems = [];
    events &&
      slicedEvents.map(event => {
        return notificationAreaItems.push(<ToastItem event={event} />);
      });
    console.log("notificationAreaItems", notificationAreaItems);
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
