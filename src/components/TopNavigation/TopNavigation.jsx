import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter, faList, faSearch, faSignOutAlt, faUserAlt} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {ModalAddEvent} from "../ModalAddEvent";
import {ModalSignIn} from "../ModalSignIn";
import './TopNavigation.scss';

export class TopNavigation extends React.Component {
    render() {
        const {user} = this.props;
        return (
            <>
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
                        <Link to={this.props.isListView ? '' : '/listView'}
                              className={"btn btn-secondary rounded-right " + (this.props.isListView ? 'active' : '')}>
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
            </>
        );
    }
}

