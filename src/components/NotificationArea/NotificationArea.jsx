import React from "react";
import "./NotificationArea.scss";
import Toast from "react-bootstrap/Toast";
import { Link } from "react-router-dom";

export class NotificationArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersOpened: false
    };
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <div
          aria-live="polite"
          aria-atomic="true"
          className={"offset-sm-9 col-sm-3"}
        >
          {/*  <Toast*/}
          {/*      // onClose={() => this.toggleToast()}*/}
          {/*      // show={showToast}*/}
          {/*      // delay={3000}*/}
          {/*      // autohide*/}
          {/*  >*/}
          {/*    <Toast.Header>*/}
          {/*      <strong className="mr-auto">Event name</strong>*/}
          {/*      <small>On 11.11.2019</small>*/}
          {/*    </Toast.Header>*/}
          {/*    <Toast.Body>*/}
          {/*      Event's description... <Link to="./listView/1">Check now</Link>*/}
          {/*    </Toast.Body>*/}
          {/*  </Toast>*/}

          {/*<Toast*/}
          {/*    // onClose={() => this.toggleToast()}*/}
          {/*    // show={showToast}*/}
          {/*    // delay={3000}*/}
          {/*    // autohide*/}
          {/*>*/}
          {/*  <Toast.Header>*/}
          {/*    <strong className="mr-auto">Event name</strong>*/}
          {/*    <small>On 11.11.2019</small>*/}
          {/*  </Toast.Header>*/}
          {/*  <Toast.Body>*/}
          {/*    Event's description... <Link to="./listView/1">Check now</Link>*/}
          {/*  </Toast.Body>*/}
          {/*</Toast>*/}
        </div>
      </>
    );
  }
}
