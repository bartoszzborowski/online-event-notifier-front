import React from "react";
import MapContainer from "../../components/MapContainer/MapContainer";
import { TopNavigation } from "../../components/TopNavigation";
import { NotificationArea } from "../../components/NotificationArea";

class HomePage extends React.Component {
  render() {
    return (
      <div className="vh-100">
        <TopNavigation />
        <MapContainer />
        <NotificationArea/>
      </div>
    );
  }
}

export default HomePage;
