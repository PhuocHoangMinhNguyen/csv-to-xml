// Create new FTP server form inside ftp screen

import React from 'react';
import axios from 'axios';

class CreateFTP extends React.Component {
    state = {
        host: '',
        port: '',
        pathInputs: '',
        pathProcess: '',
        pathError: '',
        pathOutputs: '',
        user: '',
        password: '',
    };

    handleChange = (e) => this.setState({ [e.target.id]: e.target.value });

    handleSubmit = (e) => {
        const { host, port, pathInputs, pathError, pathProcess, pathOutputs, user, password } = this.state
        const { clientCode } = this.props
        if (host !== '' && port !== '' && pathInputs !== '' && pathProcess !== ''
            && pathError !== '' && pathOutputs !== '' && user !== '' && password !== '') {
            const created = {
                clientCode: clientCode,
                host: host,
                port: port,
                pathInputs: pathInputs,
                pathProcess: pathProcess,
                pathError: pathError,
                pathOutputs: pathOutputs,
                user: user,
                password: password,
            }
            // in routes/ftp.js
            fetch('/ftp/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(created)
            }).then(response => response.json())
                .then(alert("Data Stored in Firestore"));
        } else {
            alert("Please Enter All Fields");
        };
    };

    render() {
        const { clientCode } = this.props
        return (
            <div className="section">
                <div className="card" style={{ borderRadius: 10 }}>
                    <div className="card-content">
                        <form onSubmit={this.handleSubmit} className="white">
                            <h5 className="grey-text text-darken-3">{`Create FTP Server for Client ${clientCode}`}</h5>
                            <div className="input-field">
                                <label htmlFor="host">Host Address</label>
                                <input type="text" id="host" onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="port">Port (Default is 21)</label>
                                <input type="text" id="port" onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="pathInputs">Inputs Path</label>
                                <input type="text" id="pathInputs" onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="pathProcess">Process Path</label>
                                <input type="text" id="pathProcess" onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="pathError">Error Path</label>
                                <input type="text" id="pathError" onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="pathOutputs">Outputs Path</label>
                                <input type="text" id="pathOutputs" onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="user">Username</label>
                                <input type="text" id="user" onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <button className="btn lighten-1 z-depth-0"
                                    style={{ backgroundColor: "#0078bf" }}>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateFTP