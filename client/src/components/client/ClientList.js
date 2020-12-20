// List of clients inside client screen.

import React from 'react';
import ClientSummary from './ClientSummary';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';

class ClientList extends React.Component {
    state = {
        clients: null,
    };

    componentDidMount() {
        // in routes/client.js
        axios.get('/client').then(res => this.setState({ clients: res.data }));
    };

    handleRemove = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete the client with its mapping?',
            buttons: [{
                label: 'Delete',
                onClick: () => this.handleYes(id)
            }, {
                label: 'Cancel',
                onClick: () => alert('Delete Action Canceled')
            }]
        });
    };

    handleYes = (id) => {
        const client = {
            id: id
        }
        // in routes/client.js
        fetch('/client/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(client)
        }).then(response => response.json())
            .then(resp => { this.setState({ clients: resp }) });
    };

    render() {
        const { clients } = this.state
        return (
            <div className="section">
                {clients && clients.map(client => {
                    return (<ClientSummary client={client} onRemove={() => this.handleRemove(client.id)} />)
                })}
            </div>
        );
    };
};

export default ClientList;