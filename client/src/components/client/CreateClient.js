// Create new client form inside client screen

import React from 'react';
import axios from 'axios';

class CreateClient extends React.Component {
    state = {
        clientCode: '',
        clientName: ''
    };

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleSubmit = e => {
        const { clientCode, clientName } = this.state
        if (clientCode !== '' && clientName !== '') {
            // in routes/client.js
            fetch('/createclient', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state)
            }).then(response => response.json())
                .then(alert("Data Stored in Firestore"));
        } else {
            alert('Please Enter All Fields');
        };
    };

    render() {
        return (
            <div className="section">
                <div className="card" style={{ borderRadius: 10 }}>
                    <div className="card-content">
                        <form onSubmit={this.handleSubmit} className="white">
                            <h5 className="grey-text text-darken-3">Create Client</h5>
                            <div className="input-field">
                                <label htmlFor="clientCode">Client Code</label>
                                <input type="text" id="clientCode" onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="clientName">Client Name</label>
                                <input type="text" id="clientName" onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <button className="btn lighten-1 z-depth-0"
                                    style={{ backgroundColor: "#0078bf" }}>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
};

export default CreateClient;