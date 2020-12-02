// Information for each FTP server in the FTP screen

import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';

class FTPSummary extends React.Component {
    render() {
        const { ftp, onRemove } = this.props
        return (
            <div className="card" style={{ borderRadius: 10 }}>
                <div className="card-content">
                    <div className="right" onClick={onRemove} style={{ color: "#0078bf" }}>
                        <Icon>delete</Icon>
                    </div>
                    <Link className="right" style={{ color: "#0078bf" }}
                        to={{
                            pathname: '/ftp-edit',
                            state: { ftp: ftp }
                        }}>
                        <Icon>edit</Icon>
                    </Link>
                    <h5>Host Address: {ftp.host}</h5>
                    <div className="row">
                        <div className="pink-text col s4">
                            <p>Port</p>
                            <p>Inputs Path</p>
                            <p>Process Path</p>
                            <p>Error Path</p>
                            <p>Outputs Path</p>
                            <p>Client Code</p>
                            <p>User Name</p>
                            <p>Password</p>
                        </div>
                        <div className="col s8">
                            <p>{ftp.port}</p>
                            <p>{ftp.pathInputs}</p>
                            <p>{ftp.pathProcess}</p>
                            <p>{ftp.pathError}</p>
                            <p>{ftp.pathOutputs}</p>
                            {ftp.clientCode === ''
                                ? <p>N/A</p>
                                : <p>{ftp.clientCode}</p>
                            }
                            <p>{ftp.user}</p>
                            <p>{ftp.password}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FTPSummary