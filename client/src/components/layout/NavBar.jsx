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
                            <li><NavLink to='/notification'
                                style={({ isActive }) => isActive ? { backgroundColor: '#0078bf', color: "white" } : { color: "black" }}>Notifications</NavLink></li>
                            <li><NavLink to='/mapping'
                                style={({ isActive }) => isActive ? { backgroundColor: '#0078bf', color: "white" } : { color: "black" }}>Mapping</NavLink></li>
                            <li><NavLink to='/client'
                                style={({ isActive }) => isActive ? { backgroundColor: '#0078bf', color: "white" } : { color: "black" }}>Clients</NavLink></li>
                            <li><NavLink to='/admin'
                                style={({ isActive }) => isActive ? { backgroundColor: '#0078bf', color: "white" } : { color: "black" }}>Admins</NavLink></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    };
};

export default NavBar;