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
            // get client by id
            await axios.get('/clients/' + this.props.location.state.client.id)
                .then(response => this.setState({ clientCode: response.data.id }))
                .catch(error => console.log(error));

            // get that client's ftp servers
            await axios.get('/ftps').then(response => {
                if (response.data.length > 0) {
                    this.setState({ ftps: response.data.map(ftp => ftp.clientCode) })
                }
            }).catch(error => console.log(error));
        }, 100);
    };

    handleRemove = id => {
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

    handleYes = id => {
        // delete ftp server
        axios.delete('/ftps/' + id).then(res => res.data)
            .catch(error => console.log(error));

        this.setState({
            ftps: this.state.ftps.filter(el => el._id !== id)
        })
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
