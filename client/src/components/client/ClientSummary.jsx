// Information for each client in the client screen

import React from 'react';
import { Link } from 'react-router-dom';

class ClientSummary extends React.Component {
    render() {
        const { client, onRemove } = this.props
        return (
            <div className="card" style={{ borderRadius: 10 }}>
                <div className="card-content">
                    <div className="right" style={{ color: "#0078bf" }} onClick={onRemove} >
                        <i className="material-icons">delete</i>
                    </div>
                    <Link className="right" style={{ color: "#0078bf" }}
                        to={'/client-edit/' + client.id}>
                        <i className="material-icons">edit</i>
                    </Link>
                    <Link className="right"
                        style={{ fontSize: 18, color: '#0078bf' }}
                        to={'/ftp/' + client.id}>FTP</Link>
                    <h5>Client Code: {client.id}</h5>
                    <p>Client Name: {client.clientName}</p>
                </div>
            </div>
        );
    };
};

export default ClientSummary;