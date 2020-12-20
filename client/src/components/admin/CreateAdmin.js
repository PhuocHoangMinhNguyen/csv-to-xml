import React from 'react';
import axios from 'axios';

class CreateAdmin extends React.Component {
    state = {
        email: ''
    };

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleSubmit = e => {
        // in routes/admin.js
        axios.post('/admin/create', { email: this.state.email })
            .then(alert("Data Stored in Firestore"));
    };

    render() {
        return (
            <div className="section">
                <div className="card" style={{ borderRadius: 10 }}>
                    <div className="card-content">
                        <form onSubmit={this.handleSubmit} className="white">
                            <h5 className="grey-text text-darken-3">Create Admin</h5>
                            <div className="input-field">
                                <label htmlFor="email">Admin Email Address</label>
                                <input type="text" id="email" onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <button className="btn lighten-1 z-depth-0"
                                    style={{ backgroundColor: "#0078bf" }}>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        );
    };
};

export default CreateAdmin;