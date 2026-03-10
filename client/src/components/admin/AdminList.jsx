import React from 'react';
import AdminSummary from './AdminSummary';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';

class AdminList extends React.Component {
    state = {
        admins: [],
    };

    componentDidMount() {
        // get admin list
        axios.get('/admins').then(res => this.setState({ admins: res.data }))
            .catch(error => console.log(error));
    };

    handleRemove = id => {
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

    handleYes = id => {
        // delete admin
        axios.delete('/admins/' + id)
            .then(res => console.log(res.data))
            .catch(error => console.log(error));

        this.setState({
            admins: this.state.admins.filter(el => el.id !== id)
        });
    };

    render() {
        const { admins } = this.state
        return (
            <div className="section">
                {admins.map(admin => {
                    return <AdminSummary admin={admin} onRemove={() => this.handleRemove(admin.id)} />
                })}
            </div>
        );
    };
};

export default AdminList;