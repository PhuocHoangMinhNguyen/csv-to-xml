// FTP Screen

import React from 'react';
import CreateFTP from './CreateFTP';
import FTPSummary from './FTPSummary';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

class FTPScreen extends React.Component {
    state = {
        clientCode: '',
        ftps: [],
    };

    componentDidMount() {
        setTimeout(async () => {
            // in routes/currentClient.js
            await axios.get('/getcurrentclient').then(res => this.setState({ clientCode: res.data.clientCode }));
            // in routes/ftp.js
            await fetch('/ftp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ clientCode: this.state.clientCode })
            }).then(response => response.json())
                .then(resp => { this.setState({ ftps: resp }) });
        }, 100);
    };

    handleRemove = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete the FTP server?',
            buttons: [{
                label: 'Delete',
                onClick: () => { this.handleYes(id) }
            }, {
                label: 'Cancel',
                onClick: () => { alert('Delete Action Canceled') }
            }]
        });
    };

    handleYes = (id) => {
        const ftp = {
            id: id
        }
        // in routes/ftp.js
        fetch('/deleteftp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ftp)
        }).then(response => response.json())
            .then(resp => { this.setState({ ftps: resp }) });
    };

    render() {
        const { clientCode, ftps } = this.state
        return (
            <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                <div className="row">
                    <div className="col s1"></div>
                    <div className="col s5">
                        <div className="section">
                            <div className="card" style={{ borderRadius: 10 }}>
                                <div className="card-content">
                                    <h5>{`Client: ${clientCode}`}</h5>
                                </div>
                            </div>
                            {ftps && ftps.map(ftp => {
                                return (<FTPSummary ftp={ftp} onRemove={() => this.handleRemove(ftp.id)} />)
                            })}
                        </div>
                    </div>
                    <div className="col s5">
                        <CreateFTP clientCode={clientCode} />
                    </div>
                    <div className="col s1"></div>
                </div>
            </CSSTransition>
        );
    };
};

export default FTPScreen;
