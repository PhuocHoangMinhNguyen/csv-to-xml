// Screen to drop CSV file to use as mapping.

import React from 'react';
import MappingSideBar from '../layout/MappingSideBar';
import Dropzone from './Dropzone';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

class DropFile extends React.Component {
    state = {
        mappingResult: [],
        clients: null,
        chosenClient: null,
    };

    componentDidMount() {
        // get client list
        axios.get('/clients').then(res => this.setState({ clients: res.data }))
            .catch(error => console.log(error));
    };

    handleSave = () => {
        const { mappingResult, chosenClient } = this.state
        if (chosenClient) {
            if (mappingResult) {
                let processDictionary = {
                    magellanField: [],
                    customerField: [],
                    customerValue: [],
                    magellanValue: []
                };
                let processDefaultValues = {
                    magellanField: [],
                    defaultValue: []
                };
                processDefaultValues.magellanField.push('ClientCode');
                processDefaultValues.defaultValue.push(chosenClient);
                mappingResult.forEach(element => {
                    if (element.CustomerField !== '') {
                        processDictionary.magellanField.push(element.MagellanField);
                        processDictionary.customerField.push(element.CustomerField);
                        processDictionary.customerValue.push(element.CustomerValue);
                        processDictionary.magellanValue.push(element.MagellanValue);
                    } else {
                        processDefaultValues.magellanField.push(element.MagellanField);
                        processDefaultValues.defaultValue.push(element.MagellanValue);
                    };
                });

                const dictionaryInfo = {
                    dictionaryV: processDictionary,
                    client: chosenClient
                };
                // in routes/mapping.js
                axios.post('/dictionary/save', dictionaryInfo)
                    .then(res => console.log(res.data));

                const defaultInfo = {
                    defaultV: processDefaultValues,
                    client: chosenClient
                };
                // in routes/mapping.js
                axios.post('/defaultvalue/save', defaultInfo)
                    .then(res => console.log(res.data));

                alert("Data Stored in Firestore");
                window.location = "/mapping";
            } else alert("Please Drop a Mapping File");
        } else alert('Please Choose Client Code');
    }

    render() {
        const { mappingResult, clients } = this.state
        return (
            <div className="section">
                <MappingSideBar />
                <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                    <div className="row">
                        <div className="col s2"></div>
                        <div className="col s9">
                            <div className="section white" style={{ marginTop: 10, marginBottom: 50, padding: 12, borderRadius: 10 }}>
                                <div className="input-field">
                                    <select className="browser-default" style={{ width: 250, backgroundColor: '#DDD' }} onChange={(e) => {
                                        this.setState({ chosenClient: e.target.value })
                                    }}>
                                        <option value="" disabled selected>Choose client code to view: </option>
                                        {clients && clients.map(client => {
                                            return <option value={client.id}>Client {client.id}</option>
                                        })}
                                    </select>
                                </div>
                                <h5 style={{ textAlign: "center" }}>Drop Mapping File to store in database</h5>
                                <div style={{ justifyContent: "center", display: "flex" }}>
                                    <Dropzone
                                        getjson={mappingResult => {
                                            this.setState({ mappingResult });
                                        }}>
                                        <p style={{ textAlign: "center" }}>Drop Mapping File Here</p>
                                        <p style={{ textAlign: "center" }}>Or</p>
                                        <p style={{ textAlign: "center" }}>Click to Browse</p>
                                    </Dropzone>
                                </div>
                                <div className="row" style={{ marginTop: 50 }}>
                                    <div className="pink-text col s3 zone">Magellan Fields</div>
                                    <div className="pink-text col s3 zone">Customer Fields</div>
                                    <div className="pink-text col s3 zone">Customer Values</div>
                                    <div className="pink-text col s3 zone">Magellan Default Values</div>
                                </div>
                                {mappingResult ? (
                                    mappingResult.map(mappingSmall => <div className="row">{
                                        Object.keys(mappingSmall).map(key => {
                                            return (
                                                <div className="col s3 zone">{mappingSmall[key]}</div>
                                            )
                                        })
                                    }</div>
                                    )
                                ) : null}
                                <button className="btn lighten-1 z-depth-0"
                                    style={{ backgroundColor: "#0078bf" }}
                                    onClick={this.handleSave}>Save To Firestore</button>
                            </div>
                        </div>
                        <div className="col s1"></div>
                    </div>
                </CSSTransition>
            </div>
        );
    };
};

export default DropFile;