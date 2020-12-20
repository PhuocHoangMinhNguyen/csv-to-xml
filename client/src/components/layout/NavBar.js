// Navigation Bar component

import React from "react";
import { Link, NavLink } from "react-router-dom";
import magellanLogo from "../../images/magellanLogo.png";

class NavBar extends React.Component {
    render() {
        return (
            <div className="navbar-fixed">
                <nav className="nav-wrapper white fixed">
                    <div className="container">
                        <Link to='/' className="brand-logo left">
                            <img style={{ height: 60 }} src={magellanLogo} />
                        </Link>
                        <ul className="right">
                            <li><NavLink to='/notification-screen' style={{ color: "black" }}
                                activeStyle={{ backgroundColor: '#0078bf', color: "white" }}>Notifications</NavLink></li>
                            <li><NavLink to='/mapping-screen' style={{ color: "black" }}
                                activeStyle={{ backgroundColor: '#0078bf', color: "white" }}>Mapping</NavLink></li>
                            <li><NavLink to='/client-screen' style={{ color: "black" }}
                                activeStyle={{ backgroundColor: '#0078bf', color: "white" }}>Clients</NavLink></li>
                            <li><NavLink to='/admin-screen' style={{ color: "black" }}
                                activeStyle={{ backgroundColor: '#0078bf', color: "white" }}>Admins</NavLink></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    };
};

export default NavBar;