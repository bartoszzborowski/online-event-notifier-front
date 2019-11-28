import React from 'react';
import './ListViewPage.scss';
import MapContainer from "../../components/MapContainer/MapContainer";
import {TopNavigation} from "../../components/TopNavigation";
import {EventListItem} from "../../components/EventListItem";

export class ListViewPage extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            selectedItemId: this.props.match.params.eventId ? +this.props.match.params.eventId : -1,
            listItems: [
                {
                    id: 1,
                    name: 'Some very very very very very very long name',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem elit, pretium ut imperdiet vel, semper vestibulum quam. Phasellus rhoncus dolor libero, non sollicitudin elit feugiat id. Aliquam orci metus, bibendum et dui in, porttitor convallis velit.',
                    date: '2019-11-27T16:44:16+0000',
                    location: '???',
                    attendanceFee: 13.33
                },
                {
                    id: 2,
                    name: 'test2',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem elit, pretium ut imperdiet vel, semper vestibulum quam. Phasellus rhoncus dolor libero, non sollicitudin elit feugiat id. Aliquam orci metus, bibendum et dui in, porttitor convallis velit.',
                    date: '2019-11-27T16:44:16+0000',
                    location: '???',
                    attendanceFee: 28.99
                },
                {
                    id: 3,
                    name: 'test3',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem elit, pretium ut imperdiet vel, semper vestibulum quam. Phasellus rhoncus dolor libero, non sollicitudin elit feugiat id. Aliquam orci metus, bibendum et dui in, porttitor convallis velit.',
                    date: '2019-11-27T16:44:16+0000',
                    location: '???',
                    attendanceFee: 30
                },
                {
                    id: 4,
                    name: 'test4',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem elit, pretium ut imperdiet vel, semper vestibulum quam. Phasellus rhoncus dolor libero, non sollicitudin elit feugiat id. Aliquam orci metus, bibendum et dui in, porttitor convallis velit.',
                    date: '2019-11-27T16:44:16+0000',
                    location: '???',
                    attendanceFee: 128
                }
            ]
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }

    onRouteChanged() {
        const eventId = this.props.match.params.eventId ? +this.props.match.params.eventId : -1;
        console.log(eventId);
        this.setState({
            selectedItemId: eventId
        });
    }

    render() {
        const {user} = this.props;
        const item = this.state.listItems.find(x => x.id === this.state.selectedItemId);
        console.log(item, this.state.selectedItemId);
        return (
            <div className="vh-100">
                <TopNavigation isListView={this.props.match.path.indexOf('listView') > -1}/>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4 event-list">
                            {this.state.listItems.map((item, index) => {
                                return <EventListItem item={item} selected={this.state.selectedItemId === item.id} key={index}/>
                            })}

                        </div>
                        <div className="col-sm-8 col-sm-offset-12 event-details">
                            {!item &&
                            <div>Please select an event on the left panel to see more information</div>
                            }

                            {item &&
                            <>
                                <div className={"form-row"}>
                                    <div className={"col-12 col-md-6"}>
                                        <h4>{item.name}</h4>

                                        <div className={"label"}>Attendance counter:</div>
                                        <div className={"attendance-counter mb-2"}>
                                            <div className={"value"}>
                                                <span>22222222222</span>
                                            </div>
                                            <div className={"attend-button"}>
                                                <button className={"btn btn-light " + (user ? 'disabled' : '')}>
                                                    Attend!
                                                </button>
                                            </div>
                                        </div>

                                        <div className={"label"}>Description</div>
                                        <div className={"mb-2"}>{item.description}</div>

                                        <div className={"label"}>Will take place</div>
                                        <div
                                            className={"mb-2"}>{new Date(item.date).toTimeString()} {item.location}</div>

                                        <div className={"label"}>Category</div>
                                        <div className={"mb-2"}>???</div>

                                        <div className={"label"}>Attendance fee:</div>
                                        <div className={"mb-2"}>{item.attendanceFee}</div>
                                    </div>
                                    <div className={"col-12 col-md-6 map-row"}>
                                        <MapContainer/>
                                    </div>
                                </div>
                            </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
