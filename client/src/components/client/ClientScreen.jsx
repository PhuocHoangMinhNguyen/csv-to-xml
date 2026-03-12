// Client Screen

import React from 'react';
import ClientList from './ClientList';
import CreateClient from './CreateClient';
import { CSSTransition } from 'react-transition-group';

class ClientScreen extends React.Component {
    nodeRef = React.createRef();
    render() {
        return (
            <CSSTransition in={true} appear={true} timeout={1000} classNames="fade" nodeRef={this.nodeRef}>
                <div className="row" ref={this.nodeRef}>
                    <div className="col s1"></div>
                    <div className="col s5">
                        <ClientList />
                    </div>
                    <div className="col s5">
                        <CreateClient />
                    </div>
                    <div className="col s1"></div>
                </div>
            </CSSTransition>
        );
    };
};

export default ClientScreen;
