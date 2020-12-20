// Notification Screen

import React from 'react';
import NotificationList from "./NotificationList";
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

class NotificationScreen extends React.Component {
    state = {
        notifications: [],
        currentNotifications: [],
        clients: [],
        chosenClient: '',
        chosenStatus: '',
    };

    componentDidMount = () => {
        // in routes/notification.js
        axios.get('/notification').then(res => {
            this.setState({ notifications: res.data });
            this.setState({ currentNotifications: res.data });
        });
        // in routes/client.js
        axios.get('/client').then(res => this.setState({ clients: res.data }));
    };

    filterStatus = (e) => {
        this.setState({ chosenStatus: e.target.value });
        if (e.target.value === '') {
            if (this.state.chosenClient === '') {
                this.setState({ currentNotifications: this.state.notifications });
            } else {
                var notis = [];
                this.state.notifications.forEach(noti => {
                    if (noti.client === this.state.chosenClient) notis.push(noti);
                });
                this.setState({ currentNotifications: notis });
            }
        } else {
            if (this.state.chosenClient === '') {
                var notis = [];
                this.state.notifications.forEach(noti => {
                    if (noti.notificationType === e.target.value) notis.push(noti);
                });
                this.setState({ currentNotifications: notis });
            } else {
                var notis = [];
                this.state.notifications.forEach(noti => {
                    if (noti.notificationType === e.target.value && noti.client === this.state.chosenClient)
                        notis.push(noti);
                });
                this.setState({ currentNotifications: notis });
            };
        };
    };

    filterClient = (e) => {
        this.setState({ chosenClient: e.target.value });
        if (e.target.value === '') {
            if (this.state.chosenStatus === '') {
                this.setState({ currentNotifications: this.state.notifications });
            } else {
                var notis = [];
                this.state.notifications.forEach(noti => {
                    if (noti.notificationType === this.state.chosenStatus) notis.push(noti);
                });
                this.setState({ currentNotifications: notis });
            };
        } else {
            if (this.state.chosenStatus === '') {
                var notis = [];
                this.state.notifications.forEach(noti => {
                    if (noti.client === e.target.value) notis.push(noti);
                });
                this.setState({ currentNotifications: notis });
            } else {
                var notis = [];
                this.state.notifications.forEach(noti => {
                    if (noti.client === e.target.value && noti.notificationType === this.state.chosenStatus) notis.push(noti);
                });
                this.setState({ currentNotifications: notis });
            };
        };
    };

    render() {
        const { currentNotifications, clients } = this.state;
        return (
            <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                <div className="row">
                    <div className="col s1"></div>
                    <div className="col s7">
                        <NotificationList notifications={currentNotifications} />
                    </div>
                    <div className="col s3">
                        <div className="section">
                            <div className="card" style={{ borderRadius: 10 }}>
                                <div className="card-content">
                                    <h5>Filter Options</h5>
                                    <div className="input-field">
                                        <select className="browser-default" onChange={(e) => { this.filterStatus(e) }}>
                                            <option value='' selected>Status</option>
                                            <option value='success'>Success</option>
                                            <option value='Some mapping fields cannot be found in the input file.'>Some mapping fields cannot be found in the input file.</option>
                                            <option value='mandatory fields missing'>Mandatory fields missing</option>
                                        </select>
                                    </div>
                                    <div className="input-field">
                                        <select className="browser-default" onChange={(e) => { this.filterClient(e) }}>
                                            <option value='' selected>Client Code</option>
                                            {clients && clients.map(client => {
                                                return <option value={client.id}>Client {client.id}</option>
                                            })}
                                        </select>
                                    </div>
                                    <button className="btn lighten-1 z-depth-0"
                                        style={{ backgroundColor: "#0078bf" }}
                                        onClick={() => window.location.reload(false)}>Clear Filter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s1"></div>
                </div>
            </CSSTransition>
        );
    };
};

export default NotificationScreen;
