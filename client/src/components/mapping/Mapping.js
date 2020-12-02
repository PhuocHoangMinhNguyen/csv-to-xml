// Saved mapping screen for each client.

import React from 'react';
import MappingSideBar from '../layout/MappingSideBar';
import { CSSTransition } from 'react-transition-group';

// Idea:
// - Search
// - Sort
// - Edit
// - Add values

class Dictionary extends React.Component {
    state = {
        existDictionary: [],
        existDefaultValue: [],
        clients: null,
    };

    dicdef = (clientId) => {
        const clientJson = {
            id: clientId
        }
        // in routes/mapping.js
        fetch('/dic', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientJson)
        }).then(response => response.json())
            .then(resp => {
                this.setState({ existDictionary: resp });
            });

        // in routes/mapping.js
        fetch('/def', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientJson)
        }).then(response => response.json())
            .then(resp => { this.setState({ existDefaultValue: resp }) });
    };

    componentDidMount() {
        // in routes/client.js
        window.fetch('/client')
            .then(response => response.json())
            .then(resp => { this.setState({ clients: resp }) })
            .catch(err => console.log(err));
    };

    render() {
        const { clients, existDefaultValue, existDictionary } = this.state
        return (
            <div className="section">
                <MappingSideBar />
                <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                    <div className="row">
                        <div className="col s2"></div>
                        <div className="col s9">
                            <div style={{ marginTop: 10, marginBottom: 50, padding: 12, borderRadius: 10 }} className="section white">
                                <div className="input-field">
                                    <select className="browser-default" style={{ width: 250, backgroundColor: '#DDD' }} onChange={(e) => {
                                        this.dicdef(e.target.value);
                                    }}>
                                        <option value="" disabled selected>Choose client code to view: </option>
                                        {clients && clients.map(client => {
                                            return <option value={client.id}>Client {client.id}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="row">
                                    <div className="col s8">
                                        <h5 style={{ textAlign: "center" }}>Fields Dictionary</h5>
                                    </div>
                                    <div className="col s4">
                                        <h5 style={{ textAlign: "center" }}>Default Values</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s8">
                                        <div className="row">
                                            <div className="pink-text col s3 zone">Customer Field</div>
                                            <div className="pink-text col s3 zone">Magellan Field</div>
                                            <div className="pink-text col s3 zone">Customer Value</div>
                                            <div className="pink-text col s3 zone">Magellan Value</div>
                                        </div>
                                        {existDictionary.map(item => {
                                            return (
                                                <div className="row">
                                                    <div className="col s3 zone">{item.customerField}</div>
                                                    <div className="col s3 zone">{item.magellanField}</div>
                                                    <div className="col s3 zone">{item.customerValue}</div>
                                                    <div className="col s3 zone">{item.magellanValue}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="col s4">
                                        <div className="row">
                                            <div className="pink-text col s6 zone">Magellan Field</div>
                                            <div className="pink-text col s6 zone">Default Value</div>
                                        </div>
                                        {existDefaultValue.map(item => {
                                            return (
                                                <div className="row">
                                                    <div className="col s6 zone">{item.magellanField}</div>
                                                    <div className="col s6 zone">{item.defaultValue}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col s1"></div>
                    </div>
                </CSSTransition>
            </div>
        );
    };
};

export default Dictionary;