import React from "react";
import { CSSTransition } from 'react-transition-group';

// Intro
// Notifications
// Mapping
//  - Saved
//  - Dropzone
// Clients
//  - Clients
//  - FTPs
// Admins

import adminImage from "../images/Admins.PNG";
import clientImage from "../images/Clients.PNG";
import dropzoneImage from "../images/Dropzone.PNG";
import serverImage from "../images/FTPServers.PNG";
import notiImage from "../images/Notifications.PNG";
import savedImage from "../images/SavedMapping.PNG";

var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;

class Dashboard extends React.Component {
    handleScroll = (e) => {
        scroll.scrollTo(e.target.value)
    }

    render() {
        return (
            <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                <div className="container section">
                    <div className="card" style={{ borderRadius: 10 }}>
                        <div className="card-content">
                            <h3>MAGELLAN CSV TO XML SYSTEM</h3>
                            <div style={{ fontSize: 16 }}>This is a system designed for Magellan Logistics Company to translate
                        customer's input CSV file to XML file to load into FTP server.</div>
                            <div style={{ fontSize: 16 }}>The system consists of 6 main components:</div>
                            <div className="row" style={{ fontSize: 18 }}>
                                <div className="col s4">
                                    <li value={315} onClick={(e) => this.handleScroll(e)} style={{ color: "#0078bf" }}>Notifications</li>
                                    <li value={1100} onClick={(e) => this.handleScroll(e)} style={{ color: "#0078bf" }}>Create Mapping</li>
                                    <li value={1880} onClick={(e) => this.handleScroll(e)} style={{ color: "#0078bf" }}>FTP Servers</li>
                                </div>
                                <div className="col s8">
                                    <li value={700} onClick={(e) => this.handleScroll(e)} style={{ color: "#0078bf" }}>Saved Mapping</li>
                                    <li value={1500} onClick={(e) => this.handleScroll(e)} style={{ color: "#0078bf" }}>Clients</li>
                                    <li value={2020} onClick={(e) => this.handleScroll(e)} style={{ color: "#0078bf" }}>Admins</li>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card" style={{ borderRadius: 10 }}>
                        <div className="card-content">
                            <h4>Notifications</h4>
                            <div className="row">
                                <div className="col s6" style={{ fontSize: 18 }}>
                                    <div>This screen shows all the notifications created while processing CSV files,
                                    including all success and error cases</div>
                                    <br />
                                    <div>The user can use the filter options on the right of the screen to filter
                                    some information including: the notification type and the client code</div>
                                </div>
                                <div className="col s6">
                                    <img style={{ width: 480, borderRadius: 10 }} src={notiImage} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card" style={{ borderRadius: 10 }}>
                        <div className="card-content">
                            <h4>Saved Mapping</h4>
                            <div className="row">
                                <div className="col s6">
                                    <img style={{ width: 480, borderRadius: 10 }} src={savedImage} />
                                </div>
                                <div className="col s6" style={{ fontSize: 18 }}>
                                    <div>This screen shows all the saved mapping information
                                    of each existing client</div>
                                    <br />
                                    <div>The user can choose the client code from the dropdown list
                                    to view that client's mapping information</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card" style={{ borderRadius: 10 }}>
                        <div className="card-content">
                            <h4>Create Mapping</h4>
                            <div className="row">
                                <div className="col s6" style={{ fontSize: 18 }}>
                                    <div>This screen allows the user to create new mapping information for a client by choosing the client code
                                    from the dropdownlist, and dropping a CSV file containing all mapping information of the client</div>
                                </div>
                                <div className="col s6">
                                    <img style={{ width: 480, borderRadius: 10 }} src={dropzoneImage} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card" style={{ borderRadius: 10 }}>
                        <div className="card-content">
                            <h4>Clients</h4>
                            <div className="row">
                                <div className="col s6">
                                    <img style={{ width: 480, borderRadius: 10 }} src={clientImage} />
                                </div>
                                <div className="col s6" style={{ fontSize: 18 }}>
                                    <div>This screen shows all the client information stored in the system's database</div>
                                    <br />
                                    <div>The user can add, edit, or delete the client information.
                                    The user can also view client's FTP server information</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card" style={{ borderRadius: 10 }}>
                        <div className="card-content">
                            <h4>FTP Servers</h4>
                            <div className="row">
                                <div className="col s6" style={{ fontSize: 18 }}>
                                    <div>This screen shows all FTP server information of a particular client, chosen in Clients screen</div>
                                    <br />
                                    <div>The user can add, edit, or delete the FTP server's information</div>
                                </div>
                                <div className="col s6">
                                    <img style={{ width: 480, borderRadius: 10 }} src={serverImage} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card" style={{ borderRadius: 10 }}>
                        <div className="card-content">
                            <h4>Admins</h4>
                            <div className="row">
                                <div className="col s6">
                                    <img style={{ width: 480, borderRadius: 10 }} src={adminImage} />
                                </div>
                                <div className="col s6" style={{ fontSize: 18 }}>
                                    <div>This screen shows all admins' email address. Whenever an error occurs within the system,
                                    an email will be sent to these provided admins' email adress with detailed information of the error.
                                </div>
                                    <br />
                                    <div>The user can add or delete the admins' email address</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CSSTransition >
        )
    }
}

export default Dashboard