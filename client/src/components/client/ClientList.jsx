// List of clients inside client screen.

import React from 'react';
import ClientSummary from './ClientSummary';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';

class ClientList extends React.Component {
    state = {
        clients: [],
    };

    componentDidMount() {
        // get client list
        axios.get('/clients').then(res => this.setState({ clients: res.data }))
            .catch(error => console.log(error));;
    };

    handleRemove = id => {
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

    handleYes = id => {
        // delete client
        axios.delete('/clients/' + id).then(res => console.log(res.data))
            .catch(error => console.log(error));

        this.setState({
            clients: this.state.clients.filter(el => el.id !== id)
        });
    };

    render() {
        return (
            <div className="section">
                {this.state.clients.map(client => {
                    return (
                        <ClientSummary client={client}
                            onRemove={() => this.handleRemove(client.id)}
                            key={client.id} />
                    )
                })}
            </div>
        );
    };
};

export default ClientList;