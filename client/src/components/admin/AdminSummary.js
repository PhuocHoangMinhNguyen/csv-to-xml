import React from 'react';
import { Icon } from 'react-materialize';

class AdminSummary extends React.Component {
    render() {
        const { admin, onRemove } = this.props
        return (
            <div className="card" style={{ borderRadius: 10 }}>
                <div className="card-content">
                    <div className="right" style={{ color: "#0078bf" }} onClick={onRemove} >
                        <Icon>delete</Icon>
                    </div>
                    <h5>Admin Email: {admin.email}</h5>
                </div>
            </div>
        );
    };
};

export default AdminSummary;