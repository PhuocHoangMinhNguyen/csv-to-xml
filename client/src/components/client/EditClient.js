import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

class EditClient extends React.Component {
    state = {
        id: '',
        clientName: ''
    };

    componentDidMount() {
        axios.get('/clients/' + this.props.location.state.client.id)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    clientName: response.data.clientName,
                });
            }).catch(error => console.log(error));
    };

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleSubmit = () => {
        const { id, clientName } = this.state
        if (clientName !== '') {
            const theClient = {
                id: id,
                clientName: clientName
            }
            // edit client
            axios.post('/clients/edit/' + id, theClient)
                .then(res => res.data)
                .catch(error => console.log(error));
        } else {
            alert('Please Enter All Fields to Edit Client Information');
        };
    };

    render() {
        const { id } = this.state
        return (
            <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                <div className="container section">
                    <div className="card" style={{ borderRadius: 10, height: 200 }}>
                        <div className="card-content">
                            <form className="white">
                                <h5 className="grey-text text-darken-3">{`Edit Client ${id}`}</h5>
                                <div className="input-field">
                                    <label htmlFor="clientName">Client Name</label>
                                    <input type="text" id="clientName" onChange={this.handleChange} />
                                </div>
                                <Link onClick={(e) => this.handleSubmit(e)}
                                    className="btn lighten-1 z-depth-0 right"
                                    style={{ backgroundColor: "#0078bf" }}
                                    to={"/client"}>Save</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        );
    };
};

export default EditClient