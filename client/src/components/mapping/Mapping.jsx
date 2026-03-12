// Saved mapping screen for each client.

import React from 'react';
import MappingSideBar from '../layout/MappingSideBar';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

class Dictionary extends React.Component {
    nodeRef = React.createRef();
    state = {
        existDictionary: [],
        existDefaultValue: [],
        clients: [],
    };

    dicdef = clientId => {
        // in routes/mapping.js
        axios.get('/dictionary/' + clientId).then(response => {
            this.setState({ existDictionary: response.data });
        }).catch(error => console.log(error));

        // in routes/mapping.js
        axios.get('/defaultvalue/' + clientId).then(response => {
            this.setState({ existDefaultValue: response.data });
        }).catch(error => console.log(error));
    };

    componentDidMount() {
        // get client list.
        axios.get('/clients').then(response => {
            this.setState({ clients: response.data });
        }).catch(error => console.log(error));
    };

    render() {
        const { clients, existDefaultValue, existDictionary } = this.state
        return (
            <div className="section">
                <MappingSideBar />
                <CSSTransition in={true} appear={true} timeout={1000} classNames="fade" nodeRef={this.nodeRef}>
                    <div className="row" ref={this.nodeRef}>
                        <div className="col s2"></div>
                        <div className="col s9">
                            <div style={{ marginTop: 10, marginBottom: 50, padding: 12, borderRadius: 10 }} className="section white">
                                <div className="input-field">
                                    <select className="browser-default" style={{ width: 250, backgroundColor: '#DDD' }} defaultValue="" onChange={(e) => {
                                        this.dicdef(e.target.value);
                                    }}>
                                        <option value="" disabled>Choose client code to view: </option>
                                        {clients.map(client => {
                                            return <option key={client.id} value={client.id}>Client {client.id}</option>
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
                                        {existDictionary.map((item, i) => {
                                            return (
                                                <div key={i} className="row">
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
                                        {existDefaultValue.map((item, i) => {
                                            return (
                                                <div key={i} className="row">
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