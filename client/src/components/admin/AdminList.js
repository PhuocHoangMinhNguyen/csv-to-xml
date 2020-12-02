import React from 'react';
import AdminSummary from './AdminSummary';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';

class AdminList extends React.Component {
    state = {
        admins: null,
    };

    componentDidMount() {
        // in routes/admin.js
        axios.get('/admin').then(response => response.json())
            .then(resp => { this.setState({ admins: resp }) })
            .catch(err => console.log(err));
    };

    handleRemove = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete the admin?',
            buttons: [{
                label: 'Delete',
                onClick: () => { this.handleYes(id) }
            }, {
                label: 'Cancel',
                onClick: () => { alert('Delete Action Canceled') }
            }]
        });
    };

    handleYes = (id) => {
        const admin = {
            id: id
        };
        fetch('/deleteadmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(admin)
        }).then(response => response.json())
            .then(resp => { this.setState({ admins: resp }) });
    };

    render() {
        const { admins } = this.state
        return (
            <div className="section">
                {admins && admins.map(admin => {
                    return (<AdminSummary admin={admin} onRemove={() => this.handleRemove(admin.id)} />)
                })}
            </div>
        );
    };
};

export default AdminList;