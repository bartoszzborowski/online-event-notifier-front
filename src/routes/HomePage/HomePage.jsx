import React from "react";
import MapContainer from "../../components/MapContainer/MapContainer";
import { TopNavigation } from "../../components/TopNavigation";

class HomePage extends React.Component {
  render() {
    return (
      <div className="vh-100">
        <TopNavigation />
        <MapContainer />
      </div>
    );
  }
}

export default HomePage;
