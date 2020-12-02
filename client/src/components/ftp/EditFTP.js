import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

class EditFTP extends React.Component {
    state = {
        clientCode: '',
        id: '',
        host: '',
        port: '',
        pathInputs: '',
        pathProcess: '',
        pathError: '',
        pathOutputs: '',
        user: '',
        password: '',
    };

    componentDidMount() {
        this.setState({
            clientCode: this.props.location.state.ftp.clientCode,
            id: this.props.location.state.ftp.id,
            host: this.props.location.state.ftp.host,
            port: this.props.location.state.ftp.port,
            pathInputs: this.props.location.state.ftp.pathInputs,
            pathProcess: this.props.location.state.ftp.pathProcess,
            pathError: this.props.location.state.ftp.pathError,
            pathOutputs: this.props.location.state.ftp.pathOutputs,
            user: this.props.location.state.ftp.user,
            password: this.props.location.state.ftp.password,
        });
    };

    handleChange = (e) => this.setState({ [e.target.id]: e.target.value });

    handleSubmit = () => {
        const { id, host, port, pathInputs, pathProcess, pathError, pathOutputs, clientCode, user, password } = this.state
        if (host !== '' && port !== '' && pathInputs !== '' && pathProcess !== '' && pathError !== ''
            && pathOutputs !== '' && clientCode !== '' && user !== '' && password !== '') {
            const theFTP = {
                id: id,
                host: host,
                port: port,
                pathInputs: pathInputs,
                pathProcess: pathProcess,
                pathError: pathError,
                pathOutputs: pathOutputs,
                clientCode: clientCode,
                user: user,
                password: password
            }
            // in routes/ftp.js
            fetch('/editftp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(theFTP)
            }).then(response => response.json());
        } else {
            alert('Please Enter All Fields to Edit FTP Information');
        };
    };

    render() {
        const { clientCode } = this.state
        return (
            <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                <div className="container section">
                    <div className="card" style={{ borderRadius: 10, height: 700 }}>
                        <div className="card-content">
                            <form className="white">
                                <h5 className="grey-text text-darken-3">{`Edit FTP Server for Client ${clientCode}`}</h5>
                                <div className="input-field">
                                    <label htmlFor="host">FTP Host Address</label>
                                    <input type="text" id="host" onChange={this.handleChange} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="port">FTP Port</label>
                                    <input type="text" id="port" onChange={this.handleChange} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="pathInputs">FTP Input Path</label>
                                    <input type="text" id="pathInputs" onChange={this.handleChange} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="pathProcess">FTP Process Path</label>
                                    <input type="text" id="pathProcess" onChange={this.handleChange} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="id">FTP Error Path</label>
                                    <input type="text" id="id" onChange={this.handleChange} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="pathOutputs">FTP Output Path</label>
                                    <input type="text" id="pathOutputs" onChange={this.handleChange} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="user">User Name</label>
                                    <input type="text" id="user" onChange={this.handleChange} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" onChange={this.handleChange} />
                                </div>
                                <Link onClick={(e) => this.handleSubmit(e)}
                                    className="btn lighten-1 z-depth-0 right"
                                    style={{ backgroundColor: "#0078bf" }}
                                    to={'/ftp'}>Save</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        );
    };
};

export default EditFTP;