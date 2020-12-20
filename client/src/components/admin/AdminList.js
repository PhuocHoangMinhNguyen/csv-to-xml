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
        axios.get('/admin').then(res => this.setState({ admins: res.data }));
    };

    handleRemove = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete the admin?',
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
        const admin = {
            id: id
        };
        axios.post('/admin/delete', { id: id })
            .then(res => this.setState({ admins: res.data }));
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