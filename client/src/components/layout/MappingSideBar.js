// Side Bar component for mapping option

import React from 'react';
import { NavLink } from 'react-router-dom';

class MappingSideBar extends React.Component {
    render() {
        return (
            <ul id="slide-out" className="sidenav sidenav-fixed">
                <li><NavLink to='/mapping' activeStyle={{ backgroundColor: '#DDD' }}>Saved Mapping</NavLink></li>
                <li><NavLink to='/mapping-drop-file' activeStyle={{ backgroundColor: '#DDD' }}>Create Mapping</NavLink></li>
            </ul>
        )
    }
}

export default MappingSideBar