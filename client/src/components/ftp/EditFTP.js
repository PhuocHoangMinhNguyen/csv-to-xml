import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

class EditFTP extends React.Component {
    state = {
        id: '',
        ftp: {
            clientCode: '',
            host: '',
            port: '',
            pathInputs: '',
            pathProcess: '',
            pathError: '',
            pathOutputs: '',
            user: '',
            password: '',
        }
    };

    componentDidMount() {
        // get ftp server info
        axios.get('/ftps/' + this.props.match.params.id)
            .then(response => this.setState({
                id: this.props.match.params.id,
                ftp: response.data
            }))
            .catch(error => console.log(error));
    };

    // Change
    handleChange = e => {
        this.setState({
            ftp: {
                ...this.state.ftp,
                [e.target.id]: e.target.value
            }
        });
    };

    handleSubmit = () => {
        const { id } = this.state;
        const { host, port, pathInputs, pathProcess, pathError, pathOutputs, clientCode, user, password } = this.state.ftp
        if (host !== '' && port !== '' && pathInputs !== '' && pathProcess !== '' && pathError !== ''
            && pathOutputs !== '' && clientCode !== '' && user !== '' && password !== '') {
            const theFTP = {
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
            // edit ftp server
            axios.post('/ftps/edit/' + id, theFTP).then(res => console.log(res.data))
                .catch(error => console.log(error));
        } else alert('Please Enter All Fields to Edit FTP Information');
    };

    render() {
        const { clientCode } = this.state.ftp
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
                                    <label htmlFor="pathError">FTP Error Path</label>
                                    <input type="text" id="pathError" onChange={this.handleChange} />
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
                                    to={'/ftp/' + clientCode}>Save</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        );
    };
};

export default EditFTP;