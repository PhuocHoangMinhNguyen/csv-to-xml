import React from 'react';
import AdminList from './AdminList';
import CreateAdmin from './CreateAdmin';
import { CSSTransition } from 'react-transition-group';

class AdminScreen extends React.Component {
    nodeRef = React.createRef();
    render() {
        return (
            <CSSTransition in={true} appear={true} timeout={1000} classNames="fade" nodeRef={this.nodeRef}>
                <div className="row" ref={this.nodeRef}>
                    <div className="col s1"></div>
                    <div className="col s5">
                        <AdminList />
                    </div>
                    <div className="col s5">
                        <CreateAdmin />
                    </div>
                    <div className="col s1"></div>
                </div>
            </CSSTransition>
        );
    };
};

export default AdminScreen;