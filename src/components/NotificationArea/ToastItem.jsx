import React from "react";
import "./NotificationArea.scss";
import Toast from "react-bootstrap/Toast";
import {Link} from "react-router-dom";

export class ToastItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: true
    };
  }

  toggleToast() {
    this.setState(state => {
      return {showToast: !state.showToast};
    });
  }

  render() {
    const {showToast} = this.state;
    const {event} = this.props;
    const {id, event_date, name, description} = event;
    const eventLink = `./listView/${id}`;
    return (
        <>
          {showToast && <div>
            <Toast onClose={() => this.toggleToast()} show={showToast} className={"mb-2"}>
              <Toast.Header>
                <strong className="mr-auto">{name}</strong>
                <small>{event_date}</small>
              </Toast.Header>
              <Toast.Body>
                {description} <Link to={eventLink}>Check now</Link>
              </Toast.Body>
            </Toast>
          </div>}
        </>
    );
  }
}
