import React from "react";
import { Link } from "react-router-dom";
import "./EventListItem.scss";

export class EventListItem extends React.Component {
  render() {
    const item = this.props.item;
    const selected = this.props.selected;
    return (
      item && (
        <div className={"element " + (selected ? "selected" : "")}>
          <div className={"form-row"}>
            <div className={"col"}>{item.name}</div>
            <div className={"col-auto"}>
                {!selected &&
                <Link to={"../listView/" + item.id} className={"event-link " + (selected ? 'text-secondary' : '')}>
                    CHECK
                </Link>
                }
                {selected && <span className={"text-secondary"}>CHECK</span>}
            </div>
          </div>
          <div className={"date-and-location"}>
            {new Date(item.event_date).toDateString()} {item.location}
          </div>
          <div className={"description"}>{item.description}</div>
        </div>
      )
    );
  }
}
