// Information for each client in the client screen

import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';

class ClientSummary extends React.Component {
    handleShow = async () => {
        const { client } = this.props
        const post = {
            id: client.id
        }
        // in routes/currentClient.js
        await fetch('/current/postcurrentclient', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
        }).then(response => response.json());
    };

    render() {
        const { client, onRemove } = this.props
        return (
            <div className="card" style={{ borderRadius: 10 }}>
                <div className="card-content">
                    <div className="right" style={{ color: "#0078bf" }} onClick={onRemove} >
                        <Icon>delete</Icon>
                    </div>
                    <Link className="right" style={{ color: "#0078bf" }}
                        to={{
                            pathname: '/client-edit',
                            state: { client: client }
                        }}>
                        <Icon>edit</Icon>
                    </Link>
                    <Link className="right" style={{ fontSize: 18, color: '#0078bf' }}
                        onClick={() => { this.handleShow() }}
                        to={{
                            pathname: '/ftp-screen',
                            state: { client: client }
                        }}>FTP</Link>
                    <h5>Client Code: {client.id}</h5>
                    <p>Client Name: {client.clientName}</p>
                </div>
            </div>
        );
    };
};

export default ClientSummary;