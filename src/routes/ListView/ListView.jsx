import React from 'react';
import './ListView.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilter, faList, faSearch, faSignOutAlt, faUserAlt} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import {ModalSignIn} from "../../components/ModalSignIn";
import {ModalAddEvent} from "../../components/ModalAddEvent";
import MapContainer from "../../components/MapContainer/MapContainer";

export class ListView extends React.Component {
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
                <div className="input-group navigation-group top-left">
                    <input type="text" className="form-control" placeholder="" aria-label=""
                           aria-describedby="basic-addon1"/>
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="button">
                            <FontAwesomeIcon icon={faSearch}/>
                        </button>
                        <button className="btn btn-secondary" type="button">
                            <FontAwesomeIcon icon={faFilter}/>
                        </button>
                        <Link to='/listView' className="btn btn-secondary rounded-right">
                            <FontAwesomeIcon icon={faList}/>
                        </Link>
                    </div>
                </div>
                <div className="navigation-group top-right">
                    {user && <div className="btn-group">
                        <ModalAddEvent/>
                        <button type="button" className="btn btn-secondary">
                            <FontAwesomeIcon icon={faUserAlt}/>
                        </button>
                        <Link to="/login" className="btn btn-secondary rounded-right">
                            <FontAwesomeIcon icon={faSignOutAlt}/>
                        </Link>
                    </div>}

                    {!user && <ModalSignIn/>}
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4 event-list">
                            {this.state.listItems.map((item, index) => {
                                return <div
                                    className={"element " + (this.state.selectedItemId === item.id ? 'selected' : '')}
                                    key={index}>
                                    <div className={"form-row"}>
                                        <div className={"col"}>
                                            {item.name}
                                        </div>
                                        <div className={"col-auto"}>
                                            <Link to={"/listView/" + item.id} className={"event-link"}>CHECK</Link>
                                        </div>
                                    </div>
                                    <div className={'date-and-location'}>
                                        {new Date(item.date).toDateString()} {item.location}
                                    </div>
                                    <div className={"description"}>
                                        {item.description}
                                    </div>
                                </div>
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
                                        <div className={"mb-2"}>{new Date(item.date).toTimeString()} {item.location}</div>

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
